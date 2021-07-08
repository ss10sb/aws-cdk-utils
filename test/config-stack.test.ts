import cdk = require('@aws-cdk/core');
import '@aws-cdk/assert/jest';
import {Config, ConfigStack, ConfigParameters} from "../src";

export interface OtherConfig extends Config {
    readonly Parameters: OtherParameters;
}

export interface OtherParameters extends ConfigParameters {
    readonly otherProp: string;
}

describe('config stack', () => {
    it('should not be prod when env is not set', () => {
        const app = new cdk.App();
        const buildConfig = <Config>{
            Name: 'test'
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        stack.exec();
        expect(stack.isProd).toBe(false);
    });
    it('should be prod when env is prod', () => {
        const app = new cdk.App();
        const buildConfig = <Config>{
            Name: 'test',
            Environment: 'prod'
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        stack.exec();
        expect(stack.isProd).toBe(true);
    });
    it('should mix id with the name', () => {
        const app = new cdk.App();
        const buildConfig = <Config>{
            Name: 'test'
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        stack.exec();
        expect(stack.mixNameWithId('foo')).toBe('test-foo');
    });
    it('should use typed config', () => {
        const app = new cdk.App();
        const buildConfig = <OtherConfig>{
            Name: 'test',
            Parameters: {
                otherProp: 'foo'
            }
        }
        const stack = new ConfigStack<OtherConfig>(app, 'test', {}, buildConfig);
        expect(stack.config.Parameters.otherProp).toBe('foo');
    });
    it('can store config in param store', () => {
        const app = new cdk.App();
        const buildConfig = <OtherConfig>{
            Name: 'test',
            Parameters: {
                otherProp: 'foo'
            }
        }

        class ConfigStackWithParamStore<T extends Config> extends ConfigStack<T> {
            exec() {
                this.storeConfig(this.config);
            }
        }

        const stack = new ConfigStackWithParamStore<OtherConfig>(app, 'test', {}, buildConfig);
        stack.exec();
        expect(stack).toHaveResource('AWS::SSM::Parameter', {
            Name: '/test/config',
            Type: 'String',
            Tier: 'Standard',
            Value: '{"Name":"test","Parameters":{"otherProp":"foo"}}',
        });
    });
    it('should use suffix to create id', () => {
        const app = new cdk.App();
        const buildConfig = <Config>{
            Name: 'test',
            Parameters: {}
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig, {suffix: 'bar'});
        stack.exec();
        expect(stack.node.id).toBe('test-bar');
        expect(stack.internalId).toBe('test');
    });
});
