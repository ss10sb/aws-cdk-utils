"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsmUtils = void 0;
const aws_ssm_1 = require("@aws-cdk/aws-ssm");
class SsmUtils {
    static createParam(stack, key, value) {
        return new aws_ssm_1.StringParameter(stack, 'ssm-parameter', {
            parameterName: key,
            stringValue: value
        });
    }
    static getValue(stack, key) {
        return aws_ssm_1.StringParameter.valueFromLookup(stack, key);
    }
}
exports.SsmUtils = SsmUtils;
//# sourceMappingURL=ssm-utils.js.map