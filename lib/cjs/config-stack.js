"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStack = void 0;
const tslib_1 = require("tslib");
const cdk = tslib_1.__importStar(require("@aws-cdk/core"));
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
}
exports.ConfigStack = ConfigStack;
//# sourceMappingURL=config-stack.js.map