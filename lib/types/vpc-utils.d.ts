import { IVpc, VpcLookupOptions } from "@aws-cdk/aws-ec2";
import { Stack } from "@aws-cdk/core";
import { Config } from "./config";
export declare class VpcUtils {
    static getVpcFromConfig(stack: Stack, config: Config, prefix?: string): IVpc;
    static getVpcByName(stack: Stack, vpcName: string, prefix?: string): IVpc;
    static getVpcById(stack: Stack, vpcId: string, prefix?: string): IVpc;
    static getVpcByOptions(stack: Stack, opts: VpcLookupOptions, prefix?: string): IVpc;
    static getDefaultVpcName(config: Config, name?: string): string;
}
