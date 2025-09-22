"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transcript_controller_1 = require("../../controller/transcript-controller");
const transcriptRoute = (0, express_1.Router)();
transcriptRoute.get("/result/:id", transcript_controller_1.getResult);
exports.default = transcriptRoute;
//# sourceMappingURL=index.js.map