"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParamStore = void 0;
const core_1 = require("@aws-cdk/core");
const ssm_utils_1 = require("./ssm-utils");
const config_loader_1 = require("./config-loader");
class ConfigParamStore extends core_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.storeKeys = ['Name', 'College', 'Environment', 'StoreConfig', 'Parameters'];
    }
    store(name, config) {
        let stored = {};
        for (const key of this.storeKeys) {
            stored[key.toString()] = config[key];
        }
        const stringed = JSON.stringify(stored);
        return ssm_utils_1.SsmUtils.createParam(this, this.getParamName(name), stringed);
    }
    fetchStringAsValue(name) {
        return config_loader_1.ConfigLoader.convertStringToConfig(this.fetchStringParameterAsString(name));
    }
    fetchStringParameterAsString(name) {
        return ssm_utils_1.SsmUtils.getStringValue(this, name);
    }
    fetchStringAsPlaceholder(name) {
        return ssm_utils_1.SsmUtils.getStringParam(this, this.getParamName(name));
    }
    fetchSecretAsPlaceholder(name) {
        return ssm_utils_1.SsmUtils.getSecretParam(this, this.getParamName(name));
    }
    getParamName(name) {
        return `/${this.node.id}/${name}`;
    }
    getArn(name) {
        return `arn:aws:ssm:${core_1.Stack.of(this).region}:${core_1.Stack.of(this).account}:parameter${this.getParamName(name)}`;
    }
}
exports.ConfigParamStore = ConfigParamStore;
//# sourceMappingURL=config-param-store.js.map