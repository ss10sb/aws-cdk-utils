"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcUtils = void 0;
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const utils_1 = require("./utils");
class VpcUtils {
    static getVpcFromConfig(scope, config, prefix = 'stack') {
        if (config.Parameters.vpcId) {
            return this.getVpcById(scope, config.Parameters.vpcId, prefix);
        }
        return this.getVpcByName(scope, this.getDefaultVpcName(config));
    }
    static getVpcByName(scope, vpcName, prefix = 'stack') {
        return this.getVpcByOptions(scope, {
            isDefault: false,
            vpcName: vpcName
        }, prefix);
    }
    static getVpcById(scope, vpcId, prefix = 'stack') {
        return this.getVpcByOptions(scope, {
            isDefault: false,
            vpcId: vpcId
        }, prefix);
    }
    static getVpcByOptions(scope, opts, prefix = 'stack') {
        return aws_ec2_1.Vpc.fromLookup(scope, `${prefix}-vpc`, opts);
    }
    static getDefaultVpcName(config, name = 'vpc01') {
        return `${utils_1.Utils.getBaseName(config)}-${name}/vpc`;
    }
}
exports.VpcUtils = VpcUtils;
//# sourceMappingURL=vpc-utils.js.map