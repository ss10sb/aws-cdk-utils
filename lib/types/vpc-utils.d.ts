import { IVpc } from "@aws-cdk/aws-ec2";
import { Stack } from "@aws-cdk/core";
import { Config } from "./config";
export declare class VpcUtils {
    static getVpcByName(stack: Stack, vpcName: string, prefix?: string): IVpc;
    static getDefaultVpcName(config: Config, name?: string): string;
}
