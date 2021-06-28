"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMutable = void 0;
const config_param_store_1 = require("./config-param-store");
const util_1 = require("aws-cdk/lib/util");
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
                if (paramConfig && !this.isEmpty(paramConfig)) {
                    config = paramConfig;
                }
            }
            this.param = this.storeConfigToParamStore(config);
        }
        return config;
    }
    getParamArn() {
        return this.configParamStore.getArn(this.paramName);
    }
    mergeConfigs(config, paramConfig) {
        return util_1.deepMerge(paramConfig || {}, config);
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
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}
exports.ConfigMutable = ConfigMutable;
//# sourceMappingURL=config-mutable.js.map