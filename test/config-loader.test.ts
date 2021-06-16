import {Config, ConfigLoader, ConfigParameters} from "../src";
import * as path from 'path';

const configDir = path.resolve(__dirname, 'config');
const loader = new ConfigLoader(configDir);

interface OtherConfig extends Config {
    readonly Parameters: OtherParameters;
}

interface OtherParameters extends ConfigParameters {
    readonly otherParam: string;
}

describe('config loader', () => {

    it('should return empty object with non-existent env', () => {
        const l = new ConfigLoader(path.join(__dirname));
        expect(l.load('none')).resolves.toEqual({});
    });

    it('should use default config for sdlc', () => {
        const defaultEnv = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Build: '0',
            Parameters: {}
        };

        expect(loader.load('sdlc')).resolves.toEqual(defaultEnv);
    });

    it('should override default config for prod', () => {
        const defaultEnv = {
            AWSAccountId: "200",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'prod',
            Version: '0.0.0',
            Build: '0',
            Parameters: {}
        };

        expect(loader.load('prod')).resolves.toEqual(defaultEnv);
    });

    it('should override default config for shared', () => {
        const defaultEnv = {
            AWSAccountId: "300",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'shared',
            Version: '0.0.0',
            Build: '0',
            Parameters: {}
        };

        expect(loader.load('shared')).resolves.toEqual(defaultEnv);
    });

    it('should use different config object', () => {
        const defaultEnv = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Build: '0',
            Parameters: {
                otherParam: 'foo'
            }
        };
        const typedLoader = new ConfigLoader<OtherConfig>(configDir);
        expect(typedLoader.load('other')).resolves.toEqual(defaultEnv);
    });

    it('should use js file when available', () => {
        const defaultEnv = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Build: '0',
            Parameters: {
                jsOnlyParam: 'foo'
            }
        };
        const typedLoader = new ConfigLoader<OtherConfig>(configDir);
        expect(typedLoader.load('jsonly')).resolves.toEqual(defaultEnv);
    });

    it('should use function from js file', () => {
        const defaultEnv = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Build: '0',
            Parameters: {
                testFuncParam: 'foobar'
            }
        };
        const typedLoader = new ConfigLoader<OtherConfig>(configDir);
        expect(typedLoader.load('testfunc')).resolves.toEqual(defaultEnv);
    });

    it('should use aws from js file', () => {
        const defaultEnv = {
            AWSAccountId: "100",
            AWSRegion: 'us-west-2',
            Name: 'Stack',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Build: '0',
            Parameters: {
                awsParam: 'Private'
            }
        };
        const typedLoader = new ConfigLoader<OtherConfig>(configDir);
        expect(typedLoader.load('aws')).resolves.toEqual(defaultEnv);
    });
});


