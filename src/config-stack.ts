import * as cdk from '@aws-cdk/core';
import {Config} from './config';
import {ConfigMutable} from "./config-mutable";

export class ConfigStack<T extends Config> extends cdk.Stack {

    public config: T;
    public readonly internalId: string;
    protected configMutable: ConfigMutable<T> | undefined;

    constructor(scope: cdk.Construct, id: string, stackProps: cdk.StackProps, config: T, suffix: string = '') {
        const internalId = id;
        if (suffix) {
            id = `${id}-${suffix.toLowerCase()}`;
        }
        super(scope, id, stackProps);
        this.internalId = internalId;
        this.config = this.mutateConfig(config);
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

    protected mutateConfig(config: T): T {
        this.configMutable = new ConfigMutable<T>(this, this.mixNameWithId('config'));
        return this.configMutable.mutate(config);
    }
}
