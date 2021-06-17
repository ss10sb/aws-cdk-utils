import cdk = require('@aws-cdk/core');
import {Config, ConfigStack, Utils} from "../src";
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
        const stack = await Utils.run(app, configDir, ConfigStack, 'suffix');
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
});