"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const core_1 = require("@aws-cdk/core");
const config_loader_1 = require("./config-loader");
class Utils {
    static async getConfig(app, configDir) {
        var _a;
        const env = (_a = app.node.tryGetContext('env')) !== null && _a !== void 0 ? _a : 'sdlc';
        const loader = new config_loader_1.ConfigLoader(configDir);
        return await loader.load(env);
    }
    static async run(app, configDir, stack) {
        let config = await this.getConfig(app, configDir);
        core_1.Tags.of(app).add('College', config.College);
        core_1.Tags.of(app).add('Environment', config.Environment);
        const mainStackName = `${config.College.toLowerCase()}-${config.Environment.toLowerCase()}-${config.Name}`;
        return new stack(app, mainStackName, {
            env: {
                account: config.AWSAccountId,
                region: config.AWSRegion
            }
        }, config);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map