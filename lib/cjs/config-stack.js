"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStack = void 0;
const tslib_1 = require("tslib");
const cdk = tslib_1.__importStar(require("@aws-cdk/core"));
const config_mutable_1 = require("./config-mutable");
class ConfigStack extends cdk.Stack {
    constructor(scope, id, stackProps, config, suffix = '') {
        const internalId = id;
        if (suffix) {
            id = `${id}-${suffix.toLowerCase()}`;
        }
        super(scope, id, stackProps);
        this.internalId = internalId;
        this.config = this.mutateConfig(config);
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
    mutateConfig(config) {
        this.configMutable = new config_mutable_1.ConfigMutable(this, this.mixNameWithId('config'));
        return this.configMutable.mutate(config);
    }
}
exports.ConfigStack = ConfigStack;
//# sourceMappingURL=config-stack.js.map