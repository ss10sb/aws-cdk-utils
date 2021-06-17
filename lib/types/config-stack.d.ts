import * as cdk from '@aws-cdk/core';
import { Config } from './config';
import { IStringParameter } from "@aws-cdk/aws-ssm";
export declare class ConfigStack<T extends Config> extends cdk.Stack {
    config: T;
    readonly internalId: string;
    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T, suffix?: string);
    get isProd(): boolean;
    mixNameWithId(name: string): string;
    preInit(): void;
    init(): void;
    postInit(): void;
    protected retrieveConfigValueFromParamStore(): T | null;
    protected storeConfigToParamStore(config: T): IStringParameter | null;
}
