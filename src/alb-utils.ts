import {Construct} from "@aws-cdk/core";
import {ApplicationLoadBalancer, IApplicationLoadBalancer} from "@aws-cdk/aws-elasticloadbalancingv2";
import {Config} from "./config";
import {Utils} from "./utils";
import {SsmUtils} from "./ssm-utils";

export class AlbUtils {

    public static getAlbByArn(scope: Construct, arn: string, prefix: string = 'stack'): IApplicationLoadBalancer {
        return ApplicationLoadBalancer.fromLookup(scope, `${prefix}-alb`, {
            loadBalancerArn: arn
        });
    }

    public static getAlbArnParamKey(config: Config, name: string = 'alb01'): string {
        return `${AlbUtils.getBaseAlbName(config, name)}-arn`;
    }

    public static getArnFromParams(scope: Construct, key: string): string {
        return SsmUtils.getStringValue(scope, key);
    }

    public static getDefaultAlbName(config: Config, name: string = 'alb01'): string {
        return `${this.getBaseAlbName(config, name)}/alb`;
    }

    public static getBaseAlbName(config: Config, name: string = 'alb01'): string {
        return `${Utils.getBaseName(config)}-${name}`;
    }
}