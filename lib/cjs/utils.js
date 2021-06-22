"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const core_1 = require("@aws-cdk/core");
const config_loader_1 = require("./config-loader");
class Utils {
    static async getConfig(app, configDir, configBase) {
        const env = app.node.tryGetContext('env');
        const loader = new config_loader_1.ConfigLoader(configDir, configBase);
        return await loader.load(env);
    }
    static async run(app, configDir, stack, props) {
        var _a, _b;
        let config = await this.getConfig(app, configDir, props === null || props === void 0 ? void 0 : props.configBase);
        core_1.Tags.of(app).add('College', config.College);
        core_1.Tags.of(app).add('Environment', config.Environment);
        const mainStackName = this.getMainStackName(config);
        return new stack(app, mainStackName, {
            env: {
                account: (_a = config === null || config === void 0 ? void 0 : config.AWSAccountId) !== null && _a !== void 0 ? _a : process.env.CDK_DEFAULT_ACCOUNT,
                region: (_b = config === null || config === void 0 ? void 0 : config.AWSRegion) !== null && _b !== void 0 ? _b : process.env.CDK_DEFAULT_REGION
            }
        }, config, props === null || props === void 0 ? void 0 : props.idSuffix);
    }
    static getMainStackName(config) {
        return `${this.getBaseName(config)}-${config.Name}`;
    }
    static getBaseName(config) {
        return `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}`;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map