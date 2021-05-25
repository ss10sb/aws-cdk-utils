import * as cdk from '@aws-cdk/core';
import { Config } from './config';
export declare class ConfigStack<T extends Config> extends cdk.Stack {
    readonly config: T;
    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T);
    get isProd(): boolean;
    mixNameWithId(name: string): string;
    init(): void;
}
