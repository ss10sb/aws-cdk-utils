"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMutable = void 0;
const config_param_store_1 = require("./config-param-store");
const lodash_1 = require("lodash");
class ConfigMutable {
    constructor(scope, id) {
        this.paramName = 'config';
        this.scope = scope;
        this.id = id;
        this.configParamStore = new config_param_store_1.ConfigParamStore(scope, id);
        this.param = null;
    }
    mutate(config) {
        if (this.wantsToStoreConfig(config)) {
            if (!this.wantsInitialize(config)) {
                const paramConfig = this.retrieveConfigValueFromParamStore();
                config = this.mergeConfigs(config, paramConfig);
            }
            this.param = this.storeConfigToParamStore(config);
        }
        return config;
    }
    getParamArn() {
        return this.configParamStore.getArn(this.paramName);
    }
    mergeConfigs(config, paramConfig) {
        return lodash_1.merge(config, paramConfig);
    }
    storeConfigToParamStore(config) {
        return this.configParamStore.store(this.paramName, config);
    }
    retrieveConfigValueFromParamStore() {
        try {
            return this.configParamStore.fetchStringAsValue(this.paramName);
        }
        catch (e) {
            console.log('Unable to retrieve parameter', e);
        }
        return null;
    }
    wantsToStoreConfig(config) {
        var _a;
        return (_a = config === null || config === void 0 ? void 0 : config.StoreConfig) !== null && _a !== void 0 ? _a : false;
    }
    wantsInitialize(config) {
        var _a;
        return (_a = config === null || config === void 0 ? void 0 : config.Initialize) !== null && _a !== void 0 ? _a : false;
    }
}
exports.ConfigMutable = ConfigMutable;
//# sourceMappingURL=config-mutable.js.map