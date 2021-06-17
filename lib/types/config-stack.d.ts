import * as cdk from '@aws-cdk/core';
import { Config } from './config';
import { ConfigMutable } from "./config-mutable";
export declare class ConfigStack<T extends Config> extends cdk.Stack {
    config: T;
    readonly internalId: string;
    protected configMutable: ConfigMutable<T> | undefined;
    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T, suffix?: string);
    get isProd(): boolean;
    mixNameWithId(name: string): string;
    preInit(): void;
    init(): void;
    postInit(): void;
    protected mutateConfig(config: T): T;
}
