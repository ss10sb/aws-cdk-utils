import { Construct } from "@aws-cdk/core";
import { Config } from "./config";
import { IStringParameter, StringParameter } from "@aws-cdk/aws-ssm";
export declare class ConfigParamStore extends Construct {
    storeKeys: String[];
    constructor(scope: Construct, id: string);
    store<T extends Config>(name: string, config: T): StringParameter;
    fetchStringAsValue<T extends Config>(name: string): T;
    fetchStringParameterAsString(name: string): string;
    fetchStringAsPlaceholder(name: string): IStringParameter;
    fetchSecretAsPlaceholder(name: string): IStringParameter;
    getParamName(name: string): string;
    getArn(name: string): string;
}
