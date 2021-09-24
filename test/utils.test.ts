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

    it('can add NameSuffix from config', () => {
        const config = <Config>{
            College: 'PCC',
            Environment: 'prod',
            Name: 'test',
            NameSuffix: 'foo'
        }
        expect(Utils.getMainStackName(config)).toEqual('pcc-prod-test-foo');
    });

    it('should create stack name from config and suffix', async () => {
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {idSuffix: 'suffix'});
        expect(stack.node.id).toEqual('pcc-sdlc-Stack-suffix');
        expect(stack.internalId).toEqual('pcc-sdlc-Stack');
    });

    it('should load config stack', () => {
        const app = new cdk.App();
        expect(Utils.run(app, configDir, ConfigStack)).toBeInstanceOf(ConfigStack);
    });

    it('should load extended config stack', () => {
        const app = new cdk.App();
        expect(Utils.run<ExtendedStack<ExtendedConfig>, ExtendedConfig>(app, configDir, ExtendedStack)).toBeInstanceOf(ExtendedStack);
    });

    it('should execute extended config stack', () => {
        const app = new cdk.App();
        const config: ExtendedConfig = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: ConfigEnvironments.SDLC,
            Version: "0.0.0",
            foo: 'bar',
            Parameters: {}
        };
        const stack = Utils.executeStack(app, ExtendedStack, config);
        expect(stack).toBeInstanceOf(ExtendedStack);
        expect(stack.config.foo).toBe('bar');
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

    it('should accept configBase without env', async () => {
        const expected = {
            Name: 'secrets',
            College: 'PCC',
            Environment: 'none',
            Version: "0.0.0",
            Parameters: {
                secrets: {}
            }
        };
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {configBase: 'secrets'});
        expect(stack.node.id).toEqual('pcc-none-secrets');
        expect(stack.config).toEqual(expected);
    });

    it('should accept configBase and configEnv sdlc', async () => {
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
        const stack = await Utils.run(app, configDir, ConfigStack, {configBase: 'secrets', configEnv: 'sdlc'});
        expect(stack.node.id).toEqual('pcc-sdlc-secrets');
        expect(stack.config).toEqual(expected);
    });

    it('should accept configBase and configEnv prod', async () => {
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

    it('should accept configBase and multiple configEnvs', async () => {
        const expectedProd = {
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
        const expectedSdlc = {
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
        const stack = await Utils.run(app, configDir, ConfigStack, {configBase: 'secrets', configEnv: 'prod'});
        expect(stack.node.id).toEqual('pcc-prod-secrets');
        expect(stack.config).toEqual(expectedProd);
        const stack2 = await Utils.run(app, configDir, ConfigStack, {configBase: 'secrets', configEnv: 'sdlc'});
        expect(stack2.node.id).toEqual('pcc-sdlc-secrets');
        expect(stack2.config).toEqual(expectedSdlc);
    });

    it('should pass idSuffix to stack', async () => {
        const app = new cdk.App();
        const stack = await Utils.run(app, configDir, ConfigStack, {idSuffix: 'bar'});
        expect(stack.node.id).toEqual('pcc-sdlc-Stack-bar');
        expect(stack.internalId).toEqual('pcc-sdlc-Stack');
    });
});