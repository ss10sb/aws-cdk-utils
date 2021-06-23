"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const util_1 = require("aws-cdk/lib/util");
class ConfigLoader {
    constructor(configDir, base) {
        this.base = 'defaults';
        this.configDir = configDir;
        if (base) {
            this.base = base;
        }
    }
    load(env) {
        return this.getConfigFromFiles(env);
    }
    static convertStringToConfig(value) {
        return this.convertStringToJson(value);
    }
    static convertStringToJson(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            console.log("Error parsing JSON", value);
        }
        return {};
    }
    getConfigFromFiles(env) {
        var _a;
        const defaultEnv = this.getFromBase(this.base);
        if (!env) {
            // @ts-ignore
            env = (_a = defaultEnv === null || defaultEnv === void 0 ? void 0 : defaultEnv.Environment) !== null && _a !== void 0 ? _a : null;
        }
        let overrideEnv = {};
        if (env) {
            overrideEnv = this.getFromBase(this.getEnvBase(env !== null && env !== void 0 ? env : ''));
        }
        return util_1.deepMerge({}, defaultEnv, overrideEnv);
    }
    getFromBase(base) {
        const jsFile = path.resolve(this.configDir, `${base}.js`);
        if (fs.existsSync(jsFile)) {
            return this.loadJs(jsFile);
        }
        const jsonFile = path.resolve(this.configDir, `${base}.json`);
        if (fs.existsSync(jsonFile)) {
            return ConfigLoader.convertStringToJson(fs.readFileSync(jsonFile, 'utf8'));
        }
        console.log(`Environment '${base}' not found.`);
        return {};
    }
    loadJs(file) {
        return require(file);
    }
    getEnvBase(env) {
        if (this.base === 'defaults') {
            return env;
        }
        return `${this.base}.${env}`;
    }
}
exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=config-loader.js.map