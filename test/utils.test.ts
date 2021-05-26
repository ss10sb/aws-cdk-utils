import cdk = require('@aws-cdk/core');
import {Config, ConfigStack, Utils} from "../src";
import * as path from 'path';
import {mockClient} from "aws-sdk-client-mock";
import {GetParameterCommand, SSMClient} from "@aws-sdk/client-ssm";

const configDir = path.resolve(__dirname, 'config');
const ssmMock = mockClient(SSMClient);

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

    it('should load config stack', () => {
        ssmMock.on(GetParameterCommand).resolves({});
        const app = new cdk.App();
        expect(Utils.run(app, configDir, ConfigStack)).resolves.toBeInstanceOf(ConfigStack);
    });

    it('should load extended config stack', () => {
        ssmMock.on(GetParameterCommand).resolves({});
        const app = new cdk.App();
        expect(Utils.run<ExtendedConfig>(app, configDir, ExtendedStack)).resolves.toBeInstanceOf(ExtendedStack);
    });
});