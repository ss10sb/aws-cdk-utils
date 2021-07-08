import { Config } from "./config";
import { IStringParameter, StringParameter } from "@aws-cdk/aws-ssm";
import { NonConstruct } from "./non-construct";
export declare class ConfigParamStore extends NonConstruct {
    storeKeys: String[];
    advancedSize: number;
    store<T extends Config>(name: string, config: T): StringParameter;
    fetchStringAsValue<T extends Config>(name: string): T;
    fetchStringParameterAsString(name: string): string;
    fetchStringAsPlaceholder(name: string): IStringParameter;
    fetchSecretAsPlaceholder(name: string): IStringParameter;
    getParamName(name: string): string;
    getArn(name: string): string;
}
