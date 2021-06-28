"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigFetchStore = void 0;
const config_param_store_1 = require("./config-param-store");
class ConfigFetchStore {
    constructor(scope, id) {
        this.paramName = 'config';
        this.scope = scope;
        this.id = id;
        this.configParamStore = new config_param_store_1.ConfigParamStore(scope, id);
        this.param = null;
    }
    fetch() {
        return this.retrieveConfigValueFromParamStore();
    }
    store(config) {
        return this.configParamStore.store(this.paramName, config);
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