"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStack = void 0;
const tslib_1 = require("tslib");
const cdk = tslib_1.__importStar(require("@aws-cdk/core"));
const config_fetch_store_1 = require("./config-fetch-store");
class ConfigStack extends cdk.Stack {
    constructor(scope, id, stackProps, config, configStackProps = {}) {
        const internalId = id;
        if (configStackProps.suffix) {
            id = `${id}-${configStackProps.suffix}`;
        }
        super(scope, id, stackProps);
        this.internalId = internalId;
        this.config = config;
        this.configFetchStore = new config_fetch_store_1.ConfigFetchStore(this, internalId);
        this.preInit();
        this.init();
        this.postInit();
    }
    get isProd() {
        return this.config.Environment === 'prod';
    }
    mixNameWithId(name) {
        return `${this.internalId}-${name}`;
    }
    preInit() {
        // do pre init stuff here
    }
    init() {
        // do stuff here
    }
    postInit() {
        // do post init stuff here
    }
    fetchConfig() {
        return this.configFetchStore.fetch();
    }
    storeConfig(config) {
        return this.configFetchStore.store(config);
    }
}
exports.ConfigStack = ConfigStack;
//# sourceMappingURL=config-stack.js.map