import {App} from '@aws-cdk/core';
import {SynthUtils} from "@aws-cdk/assert";
import {Config, ConfigFetchStore, ConfigStack} from "../src";

describe('config fetch', () => {
    it('can store params', () => {
        const app = new App();
        const buildConfig = <Config>{
            Name: 'test',
        }
        const stack = new ConfigStack(app, 'test', {}, buildConfig);
        const configFetchStore = new ConfigFetchStore(stack, stack.node.id);
        const config = configFetchStore.store(stack.config);
        expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
    });
});
