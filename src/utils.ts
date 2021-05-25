import {Config} from "./config";
import {App, Tags} from "@aws-cdk/core";
import {ConfigLoader} from "./config-loader";
import {ConfigStack} from "./config-stack";
import {Newable} from "./newable";

export class Utils {

    public static async getConfig<T extends Config>(app: App, configDir: string): Promise<T> {
        const env = app.node.tryGetContext('env') ?? 'sdlc';
        const loader = new ConfigLoader<T>(configDir);
        return await loader.load(env);
    }

    public static async run<T extends Config>(app: App, configDir: string, stack: Newable<ConfigStack<T>>): Promise<ConfigStack<T>> {
        let config: T = await this.getConfig<T>(app, configDir);
        Tags.of(app).add('College', config.College);
        Tags.of(app).add('Environment', config.Environment);
        const mainStackName = `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}-${config.Name}`;
        return new stack(app, mainStackName, {
            env: {
                account: config.AWSAccountId,
                region: config.AWSRegion
            }
        }, config);
    }
}