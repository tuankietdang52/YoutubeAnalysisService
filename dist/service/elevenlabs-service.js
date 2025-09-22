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
exports.transcriptAudio = void 0;
const elevenlabs_js_1 = require("@elevenlabs/elevenlabs-js");
const fs_1 = require("fs");
const result_1 = __importDefault(require("../utils/result"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const client = new elevenlabs_js_1.ElevenLabsClient();
const transcriptAudio = (audioPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const audioFile = (0, fs_1.readFileSync)(audioPath);
        const transcription = yield client.speechToText.convert({
            file: audioFile,
            modelId: "scribe_v1"
        });
        return result_1.default.success({ result: transcription, code: response_code_1.default.OK, message: "Get Transcript Successfully" });
    }
    catch (e) {
        let message = e instanceof Error ? e.message : "Error when transcript";
        return result_1.default.fail({ message: message, code: response_code_1.default.BadRequest });
    }
});
exports.transcriptAudio = transcriptAudio;
//# sourceMappingURL=elevenlabs-service.js.map