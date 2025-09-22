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
exports.analyzing = void 0;
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const youtube_service_1 = require("../service/youtube-service");
const time_utils_1 = require("../utils/time-utils");
const result_1 = __importDefault(require("../utils/result"));
const elevenlabs_service_1 = require("../service/elevenlabs-service");
const cloudinary_service_1 = require("../service/cloudinary-service");
const zerogtp_service_1 = require("../service/zerogtp-service");
const string_utils_1 = require("../utils/string-utils");
const config_1 = require("../config");
const transcript_service_1 = __importDefault(require("./transcript-service"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const openYoutubeTask = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ytdl_core_1.default.validateURL(url))
        return result_1.default.fail({ message: "Invalid youtube video url", code: response_code_1.default.BadRequest });
    return yield (0, youtube_service_1.openYoutubeVideo)(url);
});
const verifyYoutubeVideoPlaybackTask = (curPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, youtube_service_1.verifyYoutubeVideoPlayback)(curPage);
    }
    catch (_a) {
        return result_1.default.fail({ message: "Verify failed", code: response_code_1.default.InternalServerError });
    }
});
const screenshotTask = (curPage, title) => __awaiter(void 0, void 0, void 0, function* () {
    title = (0, string_utils_1.sanitizeFileName)(title, '_');
    const path = `${config_1.appConfigure.screenshotPath}${title}Screenshot`;
    yield (0, time_utils_1.delay)(1000);
    yield curPage.screenshot({
        path: `${path}.png`,
    });
    console.log(`Screenshot success. File save at ${path}.png`);
    return yield (0, cloudinary_service_1.uploadImage)(`${path}.png`);
});
const saveTranscript = (transcript, screenshot, aiProbability) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = yield transcript_service_1.default.create(transcript, screenshot, aiProbability);
        return result_1.default.success({ message: "Save successfully", code: response_code_1.default.OK, result: model });
    }
    catch (e) {
        return result_1.default.fail({ message: `Save failed. Error: ${e}`, code: response_code_1.default.InternalServerError });
    }
});
const analyzing = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const openResult = yield openYoutubeTask(url);
    if (!openResult.success())
        return result_1.default.fail({ code: response_code_1.default.InternalServerError, message: openResult.message });
    console.log(openResult.message);
    let browser = openResult.result;
    let pages = yield browser.pages();
    let page = pages[0];
    let title = yield page.title();
    const verifyResult = yield verifyYoutubeVideoPlaybackTask(page);
    if (!verifyResult.success())
        return result_1.default.fail({ code: response_code_1.default.InternalServerError, message: verifyResult.message });
    console.log(verifyResult.message);
    const screenshotResult = yield screenshotTask(page, title);
    if (!screenshotResult.success())
        return result_1.default.fail({ code: response_code_1.default.InternalServerError, message: screenshotResult.message });
    console.log("Upload Image Successfully");
    const downloadResult = yield (0, youtube_service_1.downloadAudio)(url, title);
    if (!downloadResult.success())
        return result_1.default.fail({ code: response_code_1.default.InternalServerError, message: downloadResult.message });
    console.log(downloadResult.message);
    let audioPath = downloadResult.result;
    yield (0, time_utils_1.delay)(2000);
    const transcriptionResult = yield (0, elevenlabs_service_1.transcriptAudio)(audioPath);
    if (!transcriptionResult.success())
        return result_1.default.fail({ code: response_code_1.default.InternalServerError, message: transcriptionResult.message });
    console.log("Transcript success");
    let transcript = transcriptionResult.result;
    let text = transcript.text;
    const detectAIResult = yield (0, zerogtp_service_1.detectAI)(text);
    if (!detectAIResult.success())
        return result_1.default.fail({ code: response_code_1.default.InternalServerError, message: detectAIResult.message });
    ;
    console.log("Detect success");
    const saveResult = yield saveTranscript(transcript, screenshotResult.result, detectAIResult.result);
    browser.close();
    return saveResult;
});
exports.analyzing = analyzing;
//# sourceMappingURL=analyze-service.js.map