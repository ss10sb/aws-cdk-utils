import {Stack} from "@aws-cdk/core";
import {StringParameter} from "@aws-cdk/aws-ssm";

export class SsmUtils {

    public static createParam(stack: Stack, key: string, value: string): StringParameter {
        return new StringParameter(stack, `${stack.node.id}-${key}-param`, {
            parameterName: key,
            stringValue: value
        });
    }

    public static getValue(stack: Stack, key: string): string {
        return StringParameter.valueFromLookup(stack, key);
    }
}