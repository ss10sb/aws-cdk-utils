import { Config } from "./config";
export declare class ConfigLoader<T extends Config> {
    readonly configDir: string;
    readonly base: string;
    constructor(configDir: string, base?: string);
    load(env?: string, suffix?: string): T;
    static convertStringToConfig<T extends Config>(value: string): T;
    static convertStringToJson(value: string): object;
    private getConfigFromFiles;
    private getFromBase;
    private loadJs;
    private getEnvBase;
    private getEnvSuffixBase;
}
