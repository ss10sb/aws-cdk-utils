import { IVpc, VpcLookupOptions } from "@aws-cdk/aws-ec2";
import { Construct } from "@aws-cdk/core";
import { Config } from "./config";
export declare class VpcUtils {
    static getVpcFromConfig(scope: Construct, config: Config, prefix?: string): IVpc;
    static getVpcByName(scope: Construct, vpcName: string, prefix?: string): IVpc;
    static getVpcById(scope: Construct, vpcId: string, prefix?: string): IVpc;
    static getVpcByOptions(scope: Construct, opts: VpcLookupOptions, prefix?: string): IVpc;
    static getDefaultVpcName(config: Config, name?: string): string;
}
