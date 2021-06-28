import {Construct} from "@aws-cdk/core";
import {IStringParameter} from "@aws-cdk/aws-ssm";
import {Config} from "./config";
import {ConfigParamStore} from "./config-param-store";
import {deepMerge} from "aws-cdk/lib/util";

export class ConfigMutable<T extends Config> {
    readonly scope: Construct;
    readonly id: string;
    readonly configParamStore: ConfigParamStore;
    public param: IStringParameter | null;
    public paramName: string = 'config';

    constructor(scope: Construct, id: string) {
        this.scope = scope;
        this.id = id;
        this.configParamStore = new ConfigParamStore(scope, id);
        this.param = null;
    }

    mutate(config: T): T {
        if (this.wantsToStoreConfig(config)) {
            if (!this.wantsInitialize(config)) {
                const paramConfig = this.retrieveConfigValueFromParamStore();
                if (paramConfig && !this.isEmpty(paramConfig)) {
                    config = paramConfig;
                }
            }
            this.param = this.storeConfigToParamStore(config);
        }
        return config;
    }

    getParamArn(): string {
        return this.configParamStore.getArn(this.paramName);
    }

    protected mergeConfigs(config: T, paramConfig: T | null): T {
        return <T>deepMerge(paramConfig || {}, config);
    }

    protected storeConfigToParamStore(config: T): IStringParameter | null {
        return this.configParamStore.store<T>(this.paramName, config);
    }

    protected retrieveConfigValueFromParamStore(): T | null {
        try {
            return this.configParamStore.fetchStringAsValue<T>(this.paramName);
        } catch (e) {
            console.log('Unable to retrieve parameter', e);
        }
        return null;
    }

    protected wantsToStoreConfig(config: T): boolean {
        return config?.StoreConfig ?? false;
    }

    protected wantsInitialize(config: T): boolean {
        return config?.Initialize ?? false;
    }

    protected isEmpty(obj: Object): boolean {
        return Object.keys(obj).length === 0;
    }
}