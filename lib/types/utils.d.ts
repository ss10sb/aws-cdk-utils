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
    static getConfig<T extends Config>(configDir: string, configBase?: string, configEnv?: string): T;
    static run<Stack extends ConfigStack<T>, T extends Config>(app: App, configDir: string, stack: Newable<Stack>, props?: UtilsRunProps): Stack;
    static executeStack<Stack extends ConfigStack<T>, T extends Config>(app: App, stack: Newable<Stack>, config: T, props?: UtilsRunProps): Stack;
    static createStack<Stack extends ConfigStack<T>, T extends Config>(app: App, stack: Newable<Stack>, config: T, props?: UtilsRunProps): Stack;
    static fromEnvironments<Stack extends ConfigStack<T>, T extends Config>(app: App, config: T, stack: Newable<Stack>, props?: UtilsRunProps): Stack[];
    protected static getConfigStackProps(props?: UtilsRunProps): ConfigStackProps;
    static getMainStackName(config: Config): string;
    static getBaseName(config: Config): string;
}
