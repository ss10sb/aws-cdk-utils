"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonConstruct = void 0;
class NonConstruct {
    constructor(scope, id) {
        this.scope = scope;
        this.id = id;
    }
    mixNameWithId(name) {
        return `${this.id}-${name}`;
    }
}
exports.NonConstruct = NonConstruct;
//# sourceMappingURL=non-construct.js.map