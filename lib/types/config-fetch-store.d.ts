import { Construct } from "@aws-cdk/core";
import { IStringParameter } from "@aws-cdk/aws-ssm";
import { Config } from "./config";
import { ConfigParamStore } from "./config-param-store";
export declare class ConfigFetchStore<T extends Config> {
    readonly scope: Construct;
    readonly id: string;
    readonly configParamStore: ConfigParamStore;
    param: IStringParameter | null;
    paramName: string;
    constructor(scope: Construct, id: string);
    fetch(): T;
    store(config: T): IStringParameter;
    protected storeConfigToParamStore(config: T): IStringParameter | null;
    protected retrieveConfigValueFromParamStore(): T | null;
}
