"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsmUtils = void 0;
const aws_ssm_1 = require("@aws-cdk/aws-ssm");
class SsmUtils {
    static createParam(scope, key, value, type = aws_ssm_1.ParameterType.STRING) {
        return new aws_ssm_1.StringParameter(scope, `${scope.node.id}-${key}-param`, {
            parameterName: key,
            stringValue: value,
            type: type,
            tier: SsmUtils.getParamTier(value)
        });
    }
    static getStringParam(scope, key) {
        return aws_ssm_1.StringParameter.fromStringParameterAttributes(scope, `${key}-lookup`, {
            parameterName: key
        });
    }
    static getSecretParam(scope, key, version = 1) {
        return aws_ssm_1.StringParameter.fromSecureStringParameterAttributes(scope, `${key}-lookup`, {
            parameterName: key,
            version: version
        });
    }
    static getStringValue(scope, key) {
        try {
            return aws_ssm_1.StringParameter.valueFromLookup(scope, key);
        }
        catch (e) {
            console.log(`Unable to locate param with key "${key}"`);
        }
        return '';
    }
    static getStringValuePlaceholder(scope, key) {
        return aws_ssm_1.StringParameter.valueForStringParameter(scope, key);
    }
    static getSecretValuePlaceholder(scope, key, version = 1) {
        return aws_ssm_1.StringParameter.valueForSecureStringParameter(scope, key, version);
    }
    static getParamTier(value) {
        if (Buffer.byteLength(value, 'utf8') >= SsmUtils.advancedSize) {
            return aws_ssm_1.ParameterTier.ADVANCED;
        }
        return aws_ssm_1.ParameterTier.STANDARD;
    }
}
exports.SsmUtils = SsmUtils;
SsmUtils.advancedSize = (1024 * 4);
//# sourceMappingURL=ssm-utils.js.map