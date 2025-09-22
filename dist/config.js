"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.appConfigure = void 0;
const fs_1 = require("fs");
const configure = () => {
    const raw = (0, fs_1.readFileSync)('app-config.json', 'utf-8');
    exports.appConfigure = JSON.parse(raw);
};
exports.configure = configure;
//# sourceMappingURL=config.js.map