import {Construct} from "@aws-cdk/core";
import {IStringParameter} from "@aws-cdk/aws-ssm";
import {Config} from "./config";
import {ConfigParamStore} from "./config-param-store";
import {deepMerge} from "aws-cdk/lib/util";
import {NonConstruct} from "./non-construct";

export class ConfigFetchStore<T extends Config> extends NonConstruct {
    readonly configParamStore: ConfigParamStore;
    public paramName: string = 'config';

    constructor(scope: Construct, id: string) {
        super(scope, id);
        this.configParamStore = new ConfigParamStore(scope, id);
    }

    fetch(): T {
        return <T>this.retrieveConfigValueFromParamStore();
    }

    store(config: T): IStringParameter {
        return this.configParamStore.store<T>(this.paramName, config);
    }

    getArn(): string {
        return this.configParamStore.getArn(this.paramName);
    }

    getName(): string {
        return this.configParamStore.getParamName(this.paramName);
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