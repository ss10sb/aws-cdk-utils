"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStack = void 0;
const tslib_1 = require("tslib");
const cdk = tslib_1.__importStar(require("@aws-cdk/core"));
const config_param_store_1 = require("./config-param-store");
class ConfigStack extends cdk.Stack {
    constructor(app, id, stackProps, config) {
        super(app, id, stackProps);
        this.config = config;
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
    retrieveConfigValueFromParamStore() {
        try {
            const configParamStore = new config_param_store_1.ConfigParamStore(this, this.mixNameWithId('param'));
            return configParamStore.fetchStringAsValue('config');
        }
        catch (e) {
            console.log('Unable to retrieve parameter', e);
        }
        return null;
    }
    storeConfigToParamStore(config) {
        const configParamStore = new config_param_store_1.ConfigParamStore(this, this.mixNameWithId('param'));
        return configParamStore.store('config', config);
    }
}
exports.ConfigStack = ConfigStack;
//# sourceMappingURL=config-stack.js.map