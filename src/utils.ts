import {Config} from "./config";
import {App, Tags} from "@aws-cdk/core";
import {ConfigLoader} from "./config-loader";
import {ConfigStack, ConfigStackProps} from "./config-stack";
import {Newable} from "./newable";

export interface UtilsRunProps {
    idSuffix?: string;
    configBase?: string;
    configEnv?: string;
}

export class Utils {

    public static async getConfig<T extends Config>(configDir: string, configBase?: string, configEnv?: string): Promise<T> {
        const loader = new ConfigLoader<T>(configDir, configBase);
        return await loader.load(configEnv);
    }

    public static async run<T extends Config>(app: App, configDir: string, stack: Newable<ConfigStack<T>>, props?: UtilsRunProps): Promise<ConfigStack<T>> {
        const configEnv = props?.configEnv ?? app.node.tryGetContext('env');
        let config: T = await this.getConfig<T>(configDir, props?.configBase, configEnv);
        return this.executeStack(app, stack, config, props);
    }

    public static executeStack<T extends Config>(app: App, stack: Newable<ConfigStack<T>>, config: T, props?: UtilsRunProps): ConfigStack<T> {
        Tags.of(app).add('College', config.College);
        Tags.of(app).add('Environment', config.Environment);
        const mainStackName = this.getMainStackName(config);
        return new stack(app, mainStackName, {
            env: {
                account: config?.AWSAccountId ?? process.env.CDK_DEFAULT_ACCOUNT,
                region: config?.AWSRegion ?? process.env.CDK_DEFAULT_REGION
            }
        }, config, this.getConfigStackProps(props));
    }

    protected static getConfigStackProps(props?: UtilsRunProps): ConfigStackProps {
        let csProps: ConfigStackProps = {};
        if (props?.idSuffix) {
            csProps.suffix = props.idSuffix
        }
        ;
        return csProps;
    }

    public static getMainStackName(config: Config): string {
        return `${this.getBaseName(config)}-${config.Name}`;
    }

    public static getBaseName(config: Config): string {
        return `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}`;
    }
}