import {App} from '@aws-cdk/core';
import {SynthUtils} from "@aws-cdk/assert";
import {Config, ConfigParamStore, ConfigStack} from "../src";
//import {StringParameter} from "@aws-cdk/aws-ssm";
// const ssm = require('@aws-cdk/aws-ssm');
// const ssmValueFromLookup = jest.fn().mockReturnValue('{"Name":"test","StoreConfig":true,"Parameters":{"vpcId":"abc123"}}');
// ssm.StringParameter = jest.fn().mockImplementation(() => ({
//     valueFromLookup: ssmValueFromLookup
// }));

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
});
