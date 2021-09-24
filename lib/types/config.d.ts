export declare enum ConfigEnvironments {
    PROD = "prod",
    SDLC = "sdlc",
    SHARED = "shared",
    SANDBOX = "sandbox"
}
export interface Config {
    readonly AWSAccountId?: string;
    readonly AWSRegion?: string;
    readonly Name: string;
    readonly NameSuffix?: string;
    readonly College: string;
    readonly Environment: string;
    readonly Version?: string;
    readonly Environments?: EnvConfig[];
    readonly Parameters: ConfigParameters;
}
export interface ConfigParameters {
    readonly vpcId?: string;
    readonly albArn?: string;
}
export interface EnvConfig extends Config {
    readonly Parameters: EnvParameters;
}
export interface EnvParameters extends ConfigParameters {
}
