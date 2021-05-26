import { Stack } from "@aws-cdk/core";
import { StringParameter } from "@aws-cdk/aws-ssm";
export declare class SsmUtils {
    static createParam(stack: Stack, key: string, value: string): StringParameter;
    static getValue(stack: Stack, key: string): string;
}
