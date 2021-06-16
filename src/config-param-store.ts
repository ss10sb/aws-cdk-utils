import {Construct, Stack} from "@aws-cdk/core";
import {Config} from "./config";
import {SsmUtils} from "./ssm-utils";
import {IStringParameter, StringParameter} from "@aws-cdk/aws-ssm";
import {ConfigLoader} from "./config-loader";

export class ConfigParamStore extends Construct {

    public storeKeys: String[] = ['Name', 'College', 'Environment', 'StoreConfig', 'Parameters'];

    constructor(scope: Construct, id: string) {
        super(scope, id);
    }

    store<T extends Config>(name: string, config: T): StringParameter {
        let stored: { [key: string]: any } = {};
        for (const key of this.storeKeys) {
            stored[key.toString()] = config[key as keyof T];
        }
        const stringed: string = JSON.stringify(stored);
        return SsmUtils.createParam(this, this.getParamName(name), stringed);
    }

    fetchStringAsValue<T extends Config>(name: string): T {
        return ConfigLoader.convertStringToConfig<T>(this.fetchStringParameterAsString(name));
    }

    fetchStringParameterAsString(name: string): string {
        return SsmUtils.getStringValue(this, name);
    }

    fetchStringAsPlaceholder(name: string): IStringParameter {
        return SsmUtils.getStringParam(this, this.getParamName(name));
    }

    fetchSecretAsPlaceholder(name: string): IStringParameter {
        return SsmUtils.getSecretParam(this, this.getParamName(name));
    }

    getParamName(name: string): string {
        return `/${this.node.id}/${name}`;
    }

    getArn(name: string): string {
        return `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${this.getParamName(name)}`;
    }
}