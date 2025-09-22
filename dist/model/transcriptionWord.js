"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcriptWordSchema = void 0;
const mongoose_1 = require("mongoose");
exports.transcriptWordSchema = new mongoose_1.Schema({
    text: String,
    start: Number,
    end: Number,
    type: String,
    logprob: Number
});
//# sourceMappingURL=transcriptionWord.js.map