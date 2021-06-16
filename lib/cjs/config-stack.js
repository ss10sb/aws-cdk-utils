"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStack = void 0;
const tslib_1 = require("tslib");
const cdk = tslib_1.__importStar(require("@aws-cdk/core"));
const lodash_1 = require("lodash");
const config_param_store_1 = require("./config-param-store");
class ConfigStack extends cdk.Stack {
    constructor(app, id, stackProps, config) {
        super(app, id, stackProps);
        this.config = config;
        this.configParam = null;
        this.handleConfigFromParamStore(config);
        this.init();
    }
    get isProd() {
        return this.config.Environment === 'prod';
    }
    mixNameWithId(name) {
        return `${this.node.id}-${name}`;
    }
    init() {
        // do stuff here
    }
    handleConfigFromParamStore(config) {
        if (this.wantsToStoreConfig()) {
            if (this.wantsInitialize()) {
                this.configParam = this.storeConfigToParamStore(config);
            }
            else {
                const paramConfig = this.retrieveConfigValueFromParamStore();
                if (paramConfig) {
                    this.config = lodash_1.merge(config, paramConfig);
                }
            }
        }
    }
    retrieveConfigValueFromParamStore() {
        try {
            const configParamStore = new config_param_store_1.ConfigParamStore(this, this.mixNameWithId('retrieve-param'));
            return configParamStore.fetchStringAsValue('config');
        }
        catch (e) {
            console.log('Unable to retrieve parameter', e);
        }
        return null;
    }
    storeConfigToParamStore(config) {
        const configParamStore = new config_param_store_1.ConfigParamStore(this, this.mixNameWithId('store-param'));
        return configParamStore.store('config', config);
    }
    wantsToStoreConfig() {
        var _a, _b;
        return (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.StoreConfig) !== null && _b !== void 0 ? _b : false;
    }
    wantsInitialize() {
        var _a;
        return ((_a = this.config) === null || _a === void 0 ? void 0 : _a.Initialized) === false;
    }
}
exports.ConfigStack = ConfigStack;
//# sourceMappingURL=config-stack.js.map