import {App} from '@aws-cdk/core';
import {SynthUtils} from "@aws-cdk/assert";
import {Config, ConfigMutable, ConfigStack} from "../src";

describe('config mutable', () => {
    it('can store params', () => {
        const app = new App();
        const buildConfig = <Config>{
            Name: 'test',
            StoreConfig: true,
            Initialize: true
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configMutable = new ConfigMutable(stack, stack.node.id);
        const config = configMutable.mutate(buildConfig);
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
    it('can create arn', () => {
        const app = new App();
        const buildConfig = <Config>{
            College: 'PCC',
            Environment: 'sdlc',
            Name: 'test',
            StoreConfig: true,
            Initialize: true
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configMutable = new ConfigMutable(stack, stack.node.id);
        const arn = configMutable.getParamArn();
        expect(arn).toContain(':parameter/test/config');
    });
});
