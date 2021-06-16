import {IVpc, Vpc, VpcLookupOptions} from "@aws-cdk/aws-ec2";
import {Construct, Stack} from "@aws-cdk/core";
import {Config} from "./config";
import {Utils} from "./utils";

export class VpcUtils {

    public static getVpcFromConfig(scope: Construct, config: Config, prefix: string = 'stack'): IVpc {
        if (config.Parameters.vpcId) {
            return this.getVpcById(scope, config.Parameters.vpcId, prefix);
        }
        return this.getVpcByName(scope, this.getDefaultVpcName(config));
    }

    public static getVpcByName(scope: Construct, vpcName: string, prefix: string = 'stack'): IVpc {
        return this.getVpcByOptions(scope, {
            isDefault: false,
            vpcName: vpcName
        }, prefix);
    }

    public static getVpcById(scope: Construct, vpcId: string, prefix: string = 'stack'): IVpc {
        return this.getVpcByOptions(scope, {
            isDefault: false,
            vpcId: vpcId
        }, prefix);
    }

    public static getVpcByOptions(scope: Construct, opts: VpcLookupOptions, prefix: string = 'stack'): IVpc {
        return Vpc.fromLookup(scope, `${prefix}-vpc`, opts);
    }

    public static getDefaultVpcName(config: Config, name: string = 'vpc01'): string {
        return `${Utils.getBaseName(config)}-${name}/vpc`;
    }
}