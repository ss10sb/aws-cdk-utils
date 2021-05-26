import {IVpc, Vpc, VpcLookupOptions} from "@aws-cdk/aws-ec2";
import {Stack} from "@aws-cdk/core";
import {Config} from "./config";
import {Utils} from "./utils";

export class VpcUtils {

    public static getVpcByName(stack: Stack, vpcName: string, prefix: string = 'stack'): IVpc {
        return this.getVpcByOptions(stack, {
            isDefault: false,
            vpcName: vpcName
        }, prefix);
    }

    public static getVpcById(stack: Stack, vpcId: string, prefix: string = 'stack'): IVpc {
        return this.getVpcByOptions(stack, {
            isDefault: false,
            vpcId: vpcId
        }, prefix);
    }

    public static getVpcByOptions(stack: Stack, opts: VpcLookupOptions, prefix: string = 'stack'): IVpc {
        return Vpc.fromLookup(stack, `${prefix}-vpc`, opts);
    }

    public static getDefaultVpcName(config: Config, name: string = 'vpc01'): string {
        return `${Utils.getBaseName(config)}-${name}/vpc`;
    }
}