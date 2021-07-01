"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigFetchStore = void 0;
const config_param_store_1 = require("./config-param-store");
const non_construct_1 = require("./non-construct");
class ConfigFetchStore extends non_construct_1.NonConstruct {
    constructor(scope, id) {
        super(scope, id);
        this.paramName = 'config';
        this.configParamStore = new config_param_store_1.ConfigParamStore(scope, id);
    }
    fetch() {
        return this.retrieveConfigValueFromParamStore();
    }
    store(config) {
        return this.configParamStore.store(this.paramName, config);
    }
    getArn() {
        return this.configParamStore.getArn(this.paramName);
    }
    getName() {
        return this.configParamStore.getParamName(this.paramName);
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
}
exports.ConfigFetchStore = ConfigFetchStore;
//# sourceMappingURL=config-fetch-store.js.map