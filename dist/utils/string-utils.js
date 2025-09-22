"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFileName = void 0;
const sanitizeFileName = (fileName, replace) => {
    const invalidFileNameCharacter = /[\\/:*?"<>|]/g;
    return fileName.replace(invalidFileNameCharacter, replace);
};
exports.sanitizeFileName = sanitizeFileName;
//# sourceMappingURL=string-utils.js.map