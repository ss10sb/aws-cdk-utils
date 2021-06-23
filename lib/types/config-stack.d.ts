import * as cdk from '@aws-cdk/core';
import { Config } from './config';
import { ConfigMutable } from "./config-mutable";
export interface ConfigStackProps {
    suffix?: string;
}
export declare class ConfigStack<T extends Config> extends cdk.Stack {
    config: T;
    readonly internalId: string;
    protected configMutable: ConfigMutable<T> | undefined;
    constructor(scope: cdk.Construct, id: string, stackProps: cdk.StackProps, config: T, configStackProps?: ConfigStackProps);
    get isProd(): boolean;
    mixNameWithId(name: string): string;
    preInit(): void;
    init(): void;
    postInit(): void;
    protected mutateConfig(config: T): T;
}
