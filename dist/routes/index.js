"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./analyze/index"));
const transcript_result_1 = __importDefault(require("./transcript-result"));
const routes = (0, express_1.Router)();
routes.use("/api/analyze", index_1.default);
routes.use("/api/transcript", transcript_result_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map