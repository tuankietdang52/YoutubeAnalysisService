"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeYoutubeVideo = void 0;
const analyze_service_1 = require("../service/analyze-service");
const result_1 = require("../utils/result");
const response_code_1 = __importDefault(require("../utils/response-code"));
const analyzeYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body || !req.body.url)
        return res.status(response_code_1.default.BadRequest).send("Missing URL");
    let result = yield (0, analyze_service_1.analyzing)(req.body.url);
    if (!result.success())
        return (0, result_1.sendMessageOnlyResult)(result, res);
    return (0, result_1.sendResult)(result, res);
});
exports.analyzeYoutubeVideo = analyzeYoutubeVideo;
//# sourceMappingURL=analyze-controller.js.map