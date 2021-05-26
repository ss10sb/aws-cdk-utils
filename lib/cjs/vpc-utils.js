"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcUtils = void 0;
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const utils_1 = require("./utils");
class VpcUtils {
    static getVpcByName(stack, vpcName, prefix = 'stack') {
        return aws_ec2_1.Vpc.fromLookup(stack, `${prefix}-vpc`, {
            isDefault: false,
            vpcName: vpcName
        });
    }
    static getDefaultVpcName(config, name = 'vpc01') {
        return `${utils_1.Utils.getBaseName(config)}-${name}/vpc`;
    }
}
exports.VpcUtils = VpcUtils;
//# sourceMappingURL=vpc-utils.js.map