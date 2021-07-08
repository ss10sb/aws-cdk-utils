import {Construct} from "@aws-cdk/core";
import {IStringParameter, ParameterTier, ParameterType, StringParameter} from "@aws-cdk/aws-ssm";

export class SsmUtils {

    public static advancedSize: number = (1024 * 4);

    public static createParam(scope: Construct, key: string, value: string, type: ParameterType = ParameterType.STRING): StringParameter {
        return new StringParameter(scope, `${scope.node.id}-${key}-param`, {
            parameterName: key,
            stringValue: value,
            type: type,
            tier: SsmUtils.getParamTier(value)
        });
    }

    public static getStringParam(scope: Construct, key: string): IStringParameter {
        return StringParameter.fromStringParameterAttributes(scope, `${key}-lookup`, {
            parameterName: key
        });
    }

    public static getSecretParam(scope: Construct, key: string, version: number = 1): IStringParameter {
        return StringParameter.fromSecureStringParameterAttributes(scope, `${key}-lookup`, {
            parameterName: key,
            version: version
        });
    }

    public static getStringValue(scope: Construct, key: string): string {
        try {
            return StringParameter.valueFromLookup(scope, key);
        } catch (e) {
            console.log(`Unable to locate param with key "${key}"`);
        }
        return '';
    }

    public static getStringValuePlaceholder(scope: Construct, key: string): string {
        return StringParameter.valueForStringParameter(scope, key);
    }

    public static getSecretValuePlaceholder(scope: Construct, key: string, version: number = 1): string {
        return StringParameter.valueForSecureStringParameter(scope, key, version);
    }

    public static getParamTier(value: string): ParameterTier {
        if (new Blob([value]).size >= SsmUtils.advancedSize) {
            return ParameterTier.ADVANCED;
        }
        return ParameterTier.STANDARD;
    }
}