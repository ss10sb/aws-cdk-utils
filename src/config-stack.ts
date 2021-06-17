import * as cdk from '@aws-cdk/core';
import {Config} from './config';
import {IStringParameter} from "@aws-cdk/aws-ssm";
import {ConfigParamStore} from "./config-param-store";

export class ConfigStack<T extends Config> extends cdk.Stack {

    public config: T;

    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T) {
        super(app, id, stackProps);
        this.config = config;
        this.init();
    }

    get isProd(): boolean {
        return this.config.Environment === 'prod';
    }

    mixNameWithId(name: string): string {
        return `${this.node.id}-${name}`;
    }

    init(): void {
        // do stuff here
    }

    protected retrieveConfigValueFromParamStore(): T | null {
        try {
            const configParamStore: ConfigParamStore = new ConfigParamStore(this, this.mixNameWithId('param'));
            return configParamStore.fetchStringAsValue<T>('config');
        } catch (e) {
            console.log('Unable to retrieve parameter', e);
        }
        return null;
    }

    protected storeConfigToParamStore(config: T): IStringParameter | null {
        const configParamStore: ConfigParamStore = new ConfigParamStore(this, this.mixNameWithId('param'));
        return configParamStore.store<T>('config', config);
    }
}
