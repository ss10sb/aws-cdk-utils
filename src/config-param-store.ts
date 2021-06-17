import {Construct, Stack} from "@aws-cdk/core";
import {Config} from "./config";
import {SsmUtils} from "./ssm-utils";
import {IStringParameter, StringParameter} from "@aws-cdk/aws-ssm";
import {ConfigLoader} from "./config-loader";

export class ConfigParamStore {

    public storeKeys: String[] = ['Name', 'College', 'Environment', 'StoreConfig', 'Parameters'];
    public readonly scope: Construct;
    public readonly id: string;

    constructor(scope: Construct, id: string) {
        this.scope = scope;
        this.id = id;
    }

    store<T extends Config>(name: string, config: T): StringParameter {
        let stored: { [key: string]: any } = {};
        for (const key of this.storeKeys) {
            stored[key.toString()] = config[key as keyof T];
        }
        const stringed: string = JSON.stringify(stored);
        return SsmUtils.createParam(this.scope, this.getParamName(name), stringed);
    }

    fetchStringAsValue<T extends Config>(name: string): T {
        return ConfigLoader.convertStringToConfig<T>(this.fetchStringParameterAsString(name));
    }

    fetchStringParameterAsString(name: string): string {
        return SsmUtils.getStringValue(this.scope, this.getParamName(name));
    }

    fetchStringAsPlaceholder(name: string): IStringParameter {
        return SsmUtils.getStringParam(this.scope, this.getParamName(name));
    }

    fetchSecretAsPlaceholder(name: string): IStringParameter {
        return SsmUtils.getSecretParam(this.scope, this.getParamName(name));
    }

    getParamName(name: string): string {
        return `/${this.id}/${name}`;
    }

    getArn(name: string): string {
        return `arn:aws:ssm:${Stack.of(this.scope).region}:${Stack.of(this.scope).account}:parameter${this.getParamName(name)}`;
    }
}