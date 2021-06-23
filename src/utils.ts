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

    public static getConfig<T extends Config>(configDir: string, configBase?: string, configEnv?: string): T {
        const loader = new ConfigLoader<T>(configDir, configBase);
        return loader.load(configEnv);
    }

    public static run<Stack extends ConfigStack<T>, T extends Config>(app: App, configDir: string, stack: Newable<Stack>, props?: UtilsRunProps): Stack {
        const configEnv = props?.configEnv ?? app.node.tryGetContext('env');
        let config: T = this.getConfig<T>(configDir, props?.configBase, configEnv);
        return this.executeStack(app, stack, config, props);
    }

    public static executeStack<Stack extends ConfigStack<T>, T extends Config>(app: App, stack: Newable<Stack>, config: T, props?: UtilsRunProps): Stack {
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
        return csProps;
    }

    public static getMainStackName(config: Config): string {
        return `${this.getBaseName(config)}-${config.Name}`;
    }

    public static getBaseName(config: Config): string {
        return `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}`;
    }
}