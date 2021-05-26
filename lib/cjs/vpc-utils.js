"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcUtils = void 0;
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const utils_1 = require("./utils");
class VpcUtils {
    static getVpcFromConfig(stack, config, prefix = 'stack') {
        if (config.Parameters.vpcId) {
            return this.getVpcById(stack, config.Parameters.vpcId, prefix);
        }
        return this.getVpcByName(stack, this.getDefaultVpcName(config));
    }
    static getVpcByName(stack, vpcName, prefix = 'stack') {
        return this.getVpcByOptions(stack, {
            isDefault: false,
            vpcName: vpcName
        }, prefix);
    }
    static getVpcById(stack, vpcId, prefix = 'stack') {
        return this.getVpcByOptions(stack, {
            isDefault: false,
            vpcId: vpcId
        }, prefix);
    }
    static getVpcByOptions(stack, opts, prefix = 'stack') {
        return aws_ec2_1.Vpc.fromLookup(stack, `${prefix}-vpc`, opts);
    }
    static getDefaultVpcName(config, name = 'vpc01') {
        return `${utils_1.Utils.getBaseName(config)}-${name}/vpc`;
    }
}
exports.VpcUtils = VpcUtils;
//# sourceMappingURL=vpc-utils.js.map