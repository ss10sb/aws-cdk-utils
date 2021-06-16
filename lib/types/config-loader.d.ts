import { Config } from "./config";
export declare class ConfigLoader<T extends Config> {
    readonly configDir: string;
    constructor(configDir: string);
    private getConfigFromFiles;
    private getFromBase;
    load(env: string): Promise<T>;
    static convertStringToConfig<T extends Config>(value: string): T;
}
