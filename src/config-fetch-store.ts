import {Construct} from "@aws-cdk/core";
import {IStringParameter} from "@aws-cdk/aws-ssm";
import {Config} from "./config";
import {ConfigParamStore} from "./config-param-store";
import {deepMerge} from "aws-cdk/lib/util";

export class ConfigFetchStore<T extends Config> {
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

    fetch(): T {
        return <T>this.retrieveConfigValueFromParamStore();
    }

    store(config: T): IStringParameter {
        return this.configParamStore.store<T>(this.paramName, config);
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
}