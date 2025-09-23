"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFileName = void 0;
const sanitizeFileName = (fileName, replace) => {
    const invalidFileNameCharacters = /[\/\\:*?"<>|\0-\x1F]/g;
    return fileName.replace(invalidFileNameCharacters, replace)
        .replace(/\s+/g, replace) // replace space char
        .trim();
};
exports.sanitizeFileName = sanitizeFileName;
//# sourceMappingURL=string-utils.js.map