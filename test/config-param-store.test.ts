import {App} from '@aws-cdk/core';
import {SynthUtils} from "@aws-cdk/assert";
import {Config, ConfigParamStore, ConfigStack} from "../src";

describe('config param store', () => {
    it('can store params', () => {
        const app = new App();
        const buildConfig = <Config>{
            Name: 'test'
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configParamStore = new ConfigParamStore(stack, 'cps');
        const param = configParamStore.store('test', buildConfig);
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
    it('can store advanced params', () => {
        const app = new App();
        const buildConfig = <Config>{
            Name: 'a'.repeat(4100)
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configParamStore = new ConfigParamStore(stack, 'cps');
        const param = configParamStore.store('test', buildConfig);
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
    it('can fetch string param as placeholder', () => {
        const app = new App();
        const buildConfig = <Config>{
            Name: 'test'
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configParamStore = new ConfigParamStore(stack, 'cps');
        const param = configParamStore.fetchStringAsPlaceholder('test');
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
    it('can create arn', () => {
        const app = new App();
        const buildConfig = <Config>{
            College: 'PCC',
            Environment: 'sdlc',
            Name: 'test'
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configParamStore = new ConfigParamStore(stack, stack.mixNameWithId('param'));
        const arn = configParamStore.getArn('defaults');
        expect(arn).toContain(':parameter/test-param/defaults');
    });
});
