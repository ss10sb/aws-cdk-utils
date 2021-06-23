import * as fs from 'fs';
import * as path from "path";
import {merge} from 'lodash';
import {Config} from "./config";

export class ConfigLoader<T extends Config> {
    readonly configDir: string;
    readonly base: string = 'defaults';

    constructor(configDir: string, base?: string) {
        this.configDir = configDir;
        if (base) {
            this.base = base;
        }
    }

    private async getConfigFromFiles(env?: string): Promise<T> {
        const defaultEnv = await this.getFromBase(this.base);
        let overrideEnv = {};
        if (env) {
            overrideEnv = await this.getFromBase(this.getEnvBase(env));
        }
        return <T>merge(defaultEnv, overrideEnv);
    }

    private async getFromBase(base: string): Promise<object> {
        const jsFile = path.resolve(this.configDir, `${base}.js`);
        if (fs.existsSync(jsFile)) {
            const results = await import(jsFile);
            return results.default ?? {};
        }
        const jsonFile = path.resolve(this.configDir, `${base}.json`);
        if (fs.existsSync(jsonFile)) {
            return JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        }
        console.log(`Environment '${base}' not found.`);
        return {};
    }

    private getEnvBase(env: string): string {
        if (this.base === 'defaults') {
            return env;
        }
        return `${this.base}.${env}`;
    }

    public async load(env?: string): Promise<T> {
        return await this.getConfigFromFiles(env);
    }

    public static convertStringToConfig<T extends Config>(value: string): T {
        try {
            return <T>JSON.parse(value);
        } catch (e) {
            console.log("Error parsing JSON", value);
        }
        return <T>{};
    }
}