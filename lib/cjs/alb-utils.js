"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbUtils = void 0;
const aws_elasticloadbalancingv2_1 = require("@aws-cdk/aws-elasticloadbalancingv2");
const utils_1 = require("./utils");
const ssm_utils_1 = require("./ssm-utils");
class AlbUtils {
    static getAlbByArn(scope, arn, prefix = 'stack') {
        return aws_elasticloadbalancingv2_1.ApplicationLoadBalancer.fromLookup(scope, `${prefix}-alb`, {
            loadBalancerArn: arn
        });
    }
    static getAlbArnParamKey(config, name = 'alb01') {
        return `${AlbUtils.getBaseAlbName(config, name)}-arn`;
    }
    static getArnFromParams(scope, key) {
        return ssm_utils_1.SsmUtils.getStringValue(scope, key);
    }
    static getDefaultAlbName(config, name = 'alb01') {
        return `${this.getBaseAlbName(config, name)}/alb`;
    }
    static getBaseAlbName(config, name = 'alb01') {
        return `${utils_1.Utils.getBaseName(config)}-${name}`;
    }
}
exports.AlbUtils = AlbUtils;
//# sourceMappingURL=alb-utils.js.map