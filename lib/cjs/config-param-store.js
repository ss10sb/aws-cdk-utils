"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParamStore = void 0;
const core_1 = require("@aws-cdk/core");
const ssm_utils_1 = require("./ssm-utils");
const config_loader_1 = require("./config-loader");
class ConfigParamStore {
    constructor(scope, id) {
        this.storeKeys = ['Name', 'College', 'Environment', 'StoreConfig', 'Parameters'];
        this.scope = scope;
        this.id = id;
    }
    store(name, config) {
        let stored = {};
        for (const key of this.storeKeys) {
            stored[key.toString()] = config[key];
        }
        const stringed = JSON.stringify(stored);
        return ssm_utils_1.SsmUtils.createParam(this.scope, this.getParamName(name), stringed);
    }
    fetchStringAsValue(name) {
        return config_loader_1.ConfigLoader.convertStringToConfig(this.fetchStringParameterAsString(name));
    }
    fetchStringParameterAsString(name) {
        return ssm_utils_1.SsmUtils.getStringValue(this.scope, this.getParamName(name));
    }
    fetchStringAsPlaceholder(name) {
        return ssm_utils_1.SsmUtils.getStringParam(this.scope, this.getParamName(name));
    }
    fetchSecretAsPlaceholder(name) {
        return ssm_utils_1.SsmUtils.getSecretParam(this.scope, this.getParamName(name));
    }
    getParamName(name) {
        return `/${this.id}/${name}`;
    }
    getArn(name) {
        return `arn:aws:ssm:${core_1.Stack.of(this.scope).region}:${core_1.Stack.of(this.scope).account}:parameter${this.getParamName(name)}`;
    }
}
exports.ConfigParamStore = ConfigParamStore;
//# sourceMappingURL=config-param-store.js.map