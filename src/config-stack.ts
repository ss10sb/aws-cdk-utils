import * as cdk from '@aws-cdk/core';
import {Config} from './config';
import {ConfigFetchStore} from "./config-fetch-store";
import {IStringParameter} from "@aws-cdk/aws-ssm";

export interface ConfigStackProps {
    suffix?: string;
}

export class ConfigStack<T extends Config> extends cdk.Stack {

    public config: T;
    public readonly internalId: string;
    protected readonly configFetchStore: ConfigFetchStore<T>;

    constructor(scope: cdk.Construct, id: string, stackProps: cdk.StackProps, config: T, configStackProps: ConfigStackProps = {}) {
        const internalId = id;
        if (configStackProps.suffix) {
            id = `${id}-${configStackProps.suffix}`;
        }
        super(scope, id, stackProps);
        this.internalId = internalId;
        this.config = config;
        this.configFetchStore = new ConfigFetchStore<T>(this, internalId);
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

    protected fetchConfig(): T {
        return this.configFetchStore.fetch();
    }

    protected storeConfig(config: T): IStringParameter {
        return this.configFetchStore.store(config);
    }
}
