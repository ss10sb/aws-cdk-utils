import * as cdk from '@aws-cdk/core';
import {Config} from './config';
import {merge} from 'lodash';
import {IStringParameter} from "@aws-cdk/aws-ssm";
import {ConfigParamStore} from "./config-param-store";

export class ConfigStack<T extends Config> extends cdk.Stack {

    public config: T;
    public configParam: IStringParameter | null;

    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T) {
        super(app, id, stackProps);
        this.config = config;
        this.configParam = null;
        this.handleConfigFromParamStore(config);
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

    protected handleConfigFromParamStore(config: T): void {
        if (this.wantsToStoreConfig()) {
            if (this.wantsInitialize()) {
                this.configParam = this.storeConfigToParamStore(config);
            } else {
                const paramConfig = this.retrieveConfigValueFromParamStore();
                if (paramConfig) {
                    this.config = <T>merge(config, paramConfig);
                }
            }
        }
    }

    protected retrieveConfigValueFromParamStore(): T | null {
        try {
            const configParamStore: ConfigParamStore = new ConfigParamStore(this, this.mixNameWithId('retrieve-param'));
            return configParamStore.fetchStringAsValue<T>('config');
        } catch (e) {
            console.log('Unable to retrieve parameter', e);
        }
        return null;
    }

    protected storeConfigToParamStore(config: T): IStringParameter | null {
        const configParamStore: ConfigParamStore = new ConfigParamStore(this, this.mixNameWithId('store-param'));
        return configParamStore.store<T>('config', config);
    }

    protected wantsToStoreConfig(): boolean {
        return this.config?.StoreConfig ?? false;
    }

    protected wantsInitialize(): boolean {
        return this.config?.Initialized === false;
    }
}
