import {ConfigParameters} from "./config-parameters";

export interface Config {
    readonly AWSAccountId?: string;
    readonly AWSRegion?: string;
    readonly Name: string;
    readonly College: string;
    readonly Environment: string;
    readonly Version?: string;
    readonly Build?: string;
    readonly StoreConfig?: boolean;
    readonly Initialized?: boolean;

    readonly Parameters: ConfigParameters;
}
