import * as cdk from '@aws-cdk/core';
import { Config } from './config';
import { IStringParameter } from "@aws-cdk/aws-ssm";
export declare class ConfigStack<T extends Config> extends cdk.Stack {
    config: T;
    configParam: IStringParameter | null;
    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T);
    get isProd(): boolean;
    mixNameWithId(name: string): string;
    init(): void;
    protected handleConfigFromParamStore(config: T): void;
    protected retrieveConfigValueFromParamStore(): T | null;
    protected storeConfigToParamStore(config: T): IStringParameter | null;
    protected wantsToStoreConfig(): boolean;
    protected wantsInitialize(): boolean;
}
