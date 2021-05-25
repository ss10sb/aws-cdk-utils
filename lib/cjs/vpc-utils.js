"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcUtils = void 0;
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
class VpcUtils {
    static getVpcByName(stack, vpcName, prefix = 'stack') {
        return aws_ec2_1.Vpc.fromLookup(stack, `${prefix}-vpc`, {
            isDefault: false,
            vpcName: vpcName
        });
    }
    static getDefaultVpcName(config, name = 'vpc01') {
        return `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}-${name}/vpc`;
    }
}
exports.VpcUtils = VpcUtils;
//# sourceMappingURL=vpc-utils.js.map