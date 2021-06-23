import { Config } from "./config";
export declare class ConfigLoader<T extends Config> {
    readonly configDir: string;
    readonly base: string;
    constructor(configDir: string, base?: string);
    private getConfigFromFiles;
    private getFromBase;
    private getEnvBase;
    load(env?: string): Promise<T>;
    static convertStringToConfig<T extends Config>(value: string): T;
}
