"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const lodash_1 = require("lodash");
class ConfigLoader {
    constructor(configDir) {
        this.configDir = configDir;
    }
    async getConfigFromFiles(env) {
        const defaultEnv = await this.getFromBase('defaults');
        const overrideEnv = await this.getFromBase(env);
        return lodash_1.merge(defaultEnv, overrideEnv);
    }
    async getFromBase(base) {
        var _a;
        const jsFile = path.resolve(this.configDir, `${base}.js`);
        if (fs.existsSync(jsFile)) {
            const results = await Promise.resolve().then(() => tslib_1.__importStar(require(jsFile)));
            return (_a = results.default) !== null && _a !== void 0 ? _a : {};
        }
        const jsonFile = path.resolve(this.configDir, `${base}.json`);
        if (fs.existsSync(jsonFile)) {
            return JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        }
        console.log(`Environment '${base}' not found.`);
        return {};
    }
    async load(env) {
        return await this.getConfigFromFiles(env);
    }
    static convertStringToConfig(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            console.log("Error parsing JSON", value);
        }
        return {};
    }
}
exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=config-loader.js.map