import { Construct } from "@aws-cdk/core";
import { IStringParameter, ParameterTier, ParameterType, StringParameter } from "@aws-cdk/aws-ssm";
export declare class SsmUtils {
    static advancedSize: number;
    static createParam(scope: Construct, key: string, value: string, type?: ParameterType): StringParameter;
    static getStringParam(scope: Construct, key: string): IStringParameter;
    static getSecretParam(scope: Construct, key: string, version?: number): IStringParameter;
    static getStringValue(scope: Construct, key: string): string;
    static getStringValuePlaceholder(scope: Construct, key: string): string;
    static getSecretValuePlaceholder(scope: Construct, key: string, version?: number): string;
    static getParamTier(value: string): ParameterTier;
}
