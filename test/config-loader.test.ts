import {Config, ConfigLoader, ConfigParameters} from "../src";
import * as path from 'path';

const configDir = path.join(__dirname, 'config');
const loader = new ConfigLoader(configDir);

interface OtherConfig extends Config {
    readonly Parameters: OtherParameters;
}

interface OtherParameters extends ConfigParameters {
    readonly otherParam: string;
}

interface SecretConfig extends Config {
    readonly Parameters: SecretParameters;
}

interface SecretParameters extends ConfigParameters {
    readonly secrets: { [key: string]: string };
}

describe('config loader', () => {

    it('should return empty object with non-existent env', () => {
        const l = new ConfigLoader(path.join(__dirname));
        const config = l.load('none');
        expect(config).toEqual({});
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
        const config = loader.load('sdlc');
        expect(config).toEqual(defaultEnv);
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
        const config = loader.load('prod');
        expect(config).toEqual(defaultEnv);
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

        expect(loader.load('shared')).toEqual(defaultEnv);
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
        expect(typedLoader.load('other')).toEqual(defaultEnv);
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
        expect(typedLoader.load('jsonly')).toEqual(defaultEnv);
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
        expect(typedLoader.load('testfunc')).toEqual(defaultEnv);
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
        expect(typedLoader.load('aws')).toEqual(defaultEnv);
    });

    it('should use base instead of defaults when set', () => {
        const defaultEnv = {
            Name: 'secrets',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Parameters: {
                secrets: {
                    FOO: 'sdlc'
                }
            }
        };
        const typedLoader = new ConfigLoader<SecretConfig>(configDir, 'secrets');
        expect(typedLoader.load('sdlc')).toEqual(defaultEnv);
    });

    it('should use base and mixin overrides instead of defaults when set', () => {
        const defaultEnv = {
            Name: 'secrets',
            College: 'PCC',
            Environment: 'prod',
            Version: '0.0.0',
            Parameters: {
                secrets: {
                    FOO: 'prod'
                }
            }
        };
        const typedLoader = new ConfigLoader<SecretConfig>(configDir, 'secrets');
        expect(typedLoader.load('prod')).toEqual(defaultEnv);
    });

    it('should load multiple configs when multiple envs are requested', async () => {
        const envProd = {
            Name: 'secrets',
            College: 'PCC',
            Environment: 'prod',
            Version: '0.0.0',
            Parameters: {
                secrets: {
                    FOO: 'prod'
                }
            }
        };
        const envSdlc = {
            Name: 'secrets',
            College: 'PCC',
            Environment: 'sdlc',
            Version: '0.0.0',
            Parameters: {
                secrets: {
                    FOO: 'sdlc'
                }
            }
        };
        const typedLoader = new ConfigLoader<SecretConfig>(configDir, 'secrets');
        const prod = await typedLoader.load('prod');
        const sdlc = await typedLoader.load('sdlc');
        expect(prod).toEqual(envProd);
        expect(sdlc).toEqual(envSdlc);
    });
});


