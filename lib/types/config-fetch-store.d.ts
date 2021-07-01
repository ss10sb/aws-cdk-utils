import { Construct } from "@aws-cdk/core";
import { IStringParameter } from "@aws-cdk/aws-ssm";
import { Config } from "./config";
import { ConfigParamStore } from "./config-param-store";
import { NonConstruct } from "./non-construct";
export declare class ConfigFetchStore<T extends Config> extends NonConstruct {
    readonly configParamStore: ConfigParamStore;
    paramName: string;
    constructor(scope: Construct, id: string);
    fetch(): T;
    store(config: T): IStringParameter;
    getArn(): string;
    getName(): string;
    protected storeConfigToParamStore(config: T): IStringParameter | null;
    protected retrieveConfigValueFromParamStore(): T | null;
}
