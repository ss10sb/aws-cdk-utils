import { Config } from "./config";
import { App } from "@aws-cdk/core";
import { ConfigStack } from "./config-stack";
import { Newable } from "./newable";
export interface UtilsRunProps {
    idSuffix?: string;
    configBase?: string;
}
export declare class Utils {
    static getConfig<T extends Config>(app: App, configDir: string, configBase?: string): Promise<T>;
    static run<T extends Config>(app: App, configDir: string, stack: Newable<ConfigStack<T>>, props?: UtilsRunProps): Promise<ConfigStack<T>>;
    static getMainStackName(config: Config): string;
    static getBaseName(config: Config): string;
}
