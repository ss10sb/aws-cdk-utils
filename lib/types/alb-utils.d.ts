import { Construct } from "@aws-cdk/core";
import { IApplicationLoadBalancer } from "@aws-cdk/aws-elasticloadbalancingv2";
import { Config } from "./config";
export declare class AlbUtils {
    static getAlbByArn(scope: Construct, arn: string, prefix?: string): IApplicationLoadBalancer;
    static getAlbArnParamKey(config: Config, name?: string): string;
    static getArnFromParams(scope: Construct, key: string): string;
    static getDefaultAlbName(config: Config, name?: string): string;
    static getBaseAlbName(config: Config, name?: string): string;
}
