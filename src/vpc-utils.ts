import {IVpc, Vpc} from "@aws-cdk/aws-ec2";
import {Stack} from "@aws-cdk/core";
import {Config} from "./config";

export class VpcUtils {

    public static getVpcByName(stack: Stack, vpcName: string, prefix: string = 'stack'): IVpc {
        return Vpc.fromLookup(stack, `${prefix}-vpc`, {
            isDefault: false,
            vpcName: vpcName
        });
    }

    public static getDefaultVpcName(config: Config, name: string = 'vpc01'): string {
        return `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}-${name}/vpc`;
    }
}