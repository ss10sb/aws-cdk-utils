import * as fs from 'fs';
import * as path from "path";
import {merge} from 'lodash';
import {Config} from "./config";

export class ConfigLoader<T extends Config> {
    readonly configDir: string;

    constructor(configDir: string) {
        this.configDir = configDir;
    }

    private async getConfigFromFiles(env: string | null): Promise<T> {
        const defaultEnv = await this.getFromBase('defaults');
        let overrideEnv = {};
        if (env) {
            overrideEnv = await this.getFromBase(env);
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

    public async load(env: string): Promise<T> {
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