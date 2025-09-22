"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyze_controller_1 = require("../../controller/analyze-controller");
const analyzeRoute = (0, express_1.Router)();
analyzeRoute.post("/", analyze_controller_1.analyzeYoutubeVideo);
exports.default = analyzeRoute;
//# sourceMappingURL=index.js.map