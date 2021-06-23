import { Config } from "./config";
import { App } from "@aws-cdk/core";
import { ConfigStack, ConfigStackProps } from "./config-stack";
import { Newable } from "./newable";
export interface UtilsRunProps {
    idSuffix?: string;
    configBase?: string;
    configEnv?: string;
}
export declare class Utils {
    static getConfig<T extends Config>(configDir: string, configBase?: string, configEnv?: string): Promise<T>;
    static run<T extends Config>(app: App, configDir: string, stack: Newable<ConfigStack<T>>, props?: UtilsRunProps): Promise<ConfigStack<T>>;
    static executeStack<T extends Config>(app: App, stack: Newable<ConfigStack<T>>, config: T, props?: UtilsRunProps): ConfigStack<T>;
    protected static getConfigStackProps(props?: UtilsRunProps): ConfigStackProps;
    static getMainStackName(config: Config): string;
    static getBaseName(config: Config): string;
}
