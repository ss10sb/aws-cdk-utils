import cdk = require('@aws-cdk/core');
import {Config, ConfigEnvironments, ConfigStack, Utils} from "../src";
import * as path from 'path';

const configDir = path.resolve(__dirname, 'config');

interface ExtendedConfig extends Config {
    readonly foo: string;
}

class ExtendedStack<T extends ExtendedConfig> extends ConfigStack<T> {

}

describe('utils', () => {
    it('should create base name from config', () => {
        const config = <Config>{
            College: 'PCC',
            Environment: 'prod',
            Name: 'test'
        }
        expect(Utils.getBaseName(config)).toEqual('pcc-prod');
    });

    it('should create stack name from config', () => {
        const config = <Config>{
            College: 'PCC',
            Environment: 'prod',
            Name: 'test'
        }
        expect(Utils.getMainStackName(config)).toEqual('pcc-prod-test');
    });

    it('should create stack name from config and suffix', async () => {
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {idSuffix: 'suffix'});
        expect(stack.node.id).toEqual('pcc-sdlc-Stack-suffix');
        expect(stack.internalId).toEqual('pcc-sdlc-Stack');
    });

    it('should load config stack', () => {
        const app = new cdk.App();
        expect(Utils.run(app, configDir, ConfigStack)).resolves.toBeInstanceOf(ConfigStack);
    });

    it('should load extended config stack', () => {
        const app = new cdk.App();
        expect(Utils.run<ExtendedConfig>(app, configDir, ExtendedStack)).resolves.toBeInstanceOf(ExtendedStack);
    });

    it('should load default config', async () => {
        const expected = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: ConfigEnvironments.SDLC,
            Version: "0.0.0",
            Build: '0',
            Parameters: {}
        };
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack);
        expect(stack.node.id).toEqual('pcc-sdlc-Stack');
        expect(stack.config).toEqual(expected);
    });

    it('should override default config', async () => {
        const expected = {
            AWSAccountId: "200",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: ConfigEnvironments.PROD,
            Version: "0.0.0",
            Build: '0',
            Parameters: {}
        };
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {configEnv: 'prod'});
        expect(stack.node.id).toEqual('pcc-prod-Stack');
        expect(stack.config).toEqual(expected);
    });

    it('should accept configBase', async () => {
        const expected = {
            Name: 'secrets',
            College: 'PCC',
            Environment: ConfigEnvironments.SDLC,
            Version: "0.0.0",
            Parameters: {
                secrets: {
                    FOO: 'sdlc'
                }
            }
        };
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {configBase: 'secrets'});
        expect(stack.node.id).toEqual('pcc-sdlc-secrets');
        expect(stack.config).toEqual(expected);
    });

    it('should accept configBase and configEnv', async () => {
        const expected = {
            Name: 'secrets',
            College: 'PCC',
            Environment: ConfigEnvironments.PROD,
            Version: "0.0.0",
            Parameters: {
                secrets: {
                    FOO: 'prod'
                }
            }
        };
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {configBase: 'secrets', configEnv: 'prod'});
        expect(stack.node.id).toEqual('pcc-prod-secrets');
        expect(stack.config).toEqual(expected);
    });
});