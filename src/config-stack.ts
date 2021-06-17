import * as cdk from '@aws-cdk/core';
import {Config} from './config';
import {IStringParameter} from "@aws-cdk/aws-ssm";
import {ConfigParamStore} from "./config-param-store";

export class ConfigStack<T extends Config> extends cdk.Stack {

    public config: T;

    public readonly internalId: string;

    constructor(app: cdk.App, id: string, stackProps: cdk.StackProps, config: T, suffix: string = '') {
        const internalId = id;
        if (suffix) {
            id = `${id}-${suffix.toLowerCase()}`;
        }
        super(app, id, stackProps);
        this.internalId = internalId;
        this.config = config;
        this.preInit();
        this.init();
        this.postInit();
    }

    get isProd(): boolean {
        return this.config.Environment === 'prod';
    }

    mixNameWithId(name: string): string {
        return `${this.internalId}-${name}`;
    }

    preInit(): void {
        // do pre init stuff here
    }

    init(): void {
        // do stuff here
    }

    postInit(): void {
        // do post init stuff here
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
