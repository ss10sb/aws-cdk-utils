import { Construct } from "@aws-cdk/core";
import { IStringParameter } from "@aws-cdk/aws-ssm";
import { Config } from "./config";
import { ConfigParamStore } from "./config-param-store";
export declare class ConfigMutable<T extends Config> {
    readonly scope: Construct;
    readonly id: string;
    readonly configParamStore: ConfigParamStore;
    param: IStringParameter | null;
    paramName: string;
    constructor(scope: Construct, id: string);
    mutate(config: T): T;
    getParamArn(): string;
    protected mergeConfigs(config: T, paramConfig: T | null): T;
    protected storeConfigToParamStore(config: T): IStringParameter | null;
    protected retrieveConfigValueFromParamStore(): T | null;
    protected wantsToStoreConfig(config: T): boolean;
    protected wantsInitialize(config: T): boolean;
}
