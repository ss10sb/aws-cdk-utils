import * as cdk from '@aws-cdk/core';
import { Config } from './config';
import { ConfigFetchStore } from "./config-fetch-store";
import { IStringParameter } from "@aws-cdk/aws-ssm";
export interface ConfigStackProps {
    suffix?: string;
}
export declare class ConfigStack<T extends Config> extends cdk.Stack {
    config: T;
    readonly internalId: string;
    readonly configFetchStore: ConfigFetchStore<T>;
    constructor(scope: cdk.Construct, id: string, stackProps: cdk.StackProps, config: T, configStackProps?: ConfigStackProps);
    get isProd(): boolean;
    mixNameWithId(name: string): string;
    exec(): void;
    protected fetchConfig(): T;
    protected storeConfig(config: T): IStringParameter;
}
