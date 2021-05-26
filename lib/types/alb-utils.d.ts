import { Stack } from "@aws-cdk/core";
import { IApplicationLoadBalancer } from "@aws-cdk/aws-elasticloadbalancingv2";
import { Config } from "./config";
export declare class AlbUtils {
    static getAlbByArn(stack: Stack, arn: string, prefix?: string): IApplicationLoadBalancer;
    static getArnFromParams(stack: Stack, key: string): string;
    static getDefaultAlbName(config: Config, name?: string): string;
}
