import * as fs from 'fs';
import * as path from "path";
import {Config} from "./config";
import {deepMerge} from "aws-cdk/lib/util";

export class ConfigLoader<T extends Config> {
    readonly configDir: string;
    readonly base: string = 'defaults';

    constructor(configDir: string, base?: string) {
        this.configDir = configDir;
        if (base) {
            this.base = base;
        }
    }

    public load(env?: string, suffix?: string): T {
        return this.getConfigFromFiles(env, suffix);
    }

    public static convertStringToConfig<T extends Config>(value: string): T {
        return <T>this.convertStringToJson(value);
    }

    public static convertStringToJson(value: string): object {
        try {
            return JSON.parse(value);
        } catch (e) {
            console.log("Error parsing JSON", value);
        }
        return {};
    }

    private getConfigFromFiles(env?: string, suffix?: string): T {
        const defaultEnv = this.getFromBase(this.base);
        if (!env) {
            // @ts-ignore
            env = defaultEnv?.Environment ?? null;
        }
        let overrideEnv = {};
        let overrideEnvSuffix = {};
        if (env) {
            const envBase = this.getEnvBase(env);
            overrideEnv = this.getFromBase(envBase);
            if (suffix) {
                overrideEnvSuffix = this.getFromBase(this.getEnvSuffixBase(envBase, suffix));
            }
        }
        return <T>deepMerge({}, defaultEnv, overrideEnv, overrideEnvSuffix);
    }

    private getFromBase(base: string): object {
        const jsFile = path.resolve(this.configDir, `${base}.js`);
        if (fs.existsSync(jsFile)) {
            return this.loadJs(jsFile);
        }
        const jsonFile = path.resolve(this.configDir, `${base}.json`);
        if (fs.existsSync(jsonFile)) {
            return ConfigLoader.convertStringToJson(fs.readFileSync(jsonFile, 'utf8'));
        }
        console.log(`Environment '${base}' not found.`);
        return {};
    }

    private loadJs(file: string): object {
        return require(file);
    }

    private getEnvBase(env: string): string {
        if (this.base === 'defaults') {
            return env;
        }
        return [this.base, env].join('.');
    }

    private getEnvSuffixBase(base: string, suffix: string): string {
        return [base, suffix].join('.');
    }
}