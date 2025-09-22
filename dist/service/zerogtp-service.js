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
exports.detectAI = void 0;
const axios_1 = __importDefault(require("axios"));
const result_1 = __importDefault(require("../utils/result"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const url = "https://api.zerogpt.com/api/detect/detectText";
const detectAI = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const inputData = {
        input_text: text
    };
    const reqOptions = {
        headers: {
            'ApiKey': process.env.ZEROGPT_API_KEY
        },
        redirect: 'follow'
    };
    try {
        const response = yield axios_1.default.post(url, inputData, reqOptions);
        const data = response.data;
        const aiProbability = data.data.fakePercentage;
        return result_1.default.success({ message: "AI Detect successful", code: response_code_1.default.OK, result: aiProbability });
    }
    catch (e) {
        return result_1.default.fail({ message: `${e}`, code: response_code_1.default.InternalServerError });
    }
});
exports.detectAI = detectAI;
//# sourceMappingURL=zerogtp-service.js.map