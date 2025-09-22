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
exports.downloadAudio = exports.openYoutubeVideo = exports.verifyYoutubeVideoPlayback = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const result_1 = __importDefault(require("../utils/result"));
const time_utils_1 = require("../utils/time-utils");
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const ffmpeg_service_1 = require("./ffmpeg-service");
const fs_1 = require("fs");
const string_utils_1 = require("../utils/string-utils");
const config_1 = require("../config");
const response_code_1 = __importDefault(require("../utils/response-code"));
const skipOrWaitAds = (curPage) => __awaiter(void 0, void 0, void 0, function* () {
    // trying to click skip ad but not working, this function is only waiting for ads
    yield curPage.$eval('.video-stream', el => {
        const video = el;
        if (video.paused)
            video.play();
    });
    let isAdPlaying = null;
    do {
        // try {
        //     await curPage.$eval('.ytp-skip-ad-button', el => {
        //         const evt = new MouseEvent('click', {
        //             bubbles: true,
        //             cancelable: true,
        //             view: window
        //         });
        //         el.dispatchEvent(evt);
        //     });
        // }
        // catch {
        // }
        isAdPlaying = yield curPage.$('div.ad-showing');
        if (isAdPlaying)
            (0, time_utils_1.delay)(1000);
    } while (isAdPlaying);
});
const verifyYoutubeVideoPlayback = (curPage) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if something wrong and cant find the main video
    yield curPage.waitForSelector('.video-stream', { timeout: 10000 });
    yield skipOrWaitAds(curPage);
    yield curPage.$eval('.video-stream', el => {
        const video = el;
        if (video.paused)
            video.play();
    });
    return result_1.default.success({ message: "Verify Successful", code: response_code_1.default.OK });
});
exports.verifyYoutubeVideoPlayback = verifyYoutubeVideoPlayback;
const openning = (url, page) => __awaiter(void 0, void 0, void 0, function* () {
    let isOpenSuccess = false;
    yield page.goto(url, {
        waitUntil: 'networkidle2'
    })
        .then(() => isOpenSuccess = true)
        .catch(e => isOpenSuccess = false);
    return isOpenSuccess;
});
const openYoutubeVideo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--use-gl=egl",
        ]
    });
    const pages = yield browser.pages();
    const page = pages[0];
    if (page == null)
        return result_1.default.fail({ message: "Something wrong", code: response_code_1.default.InternalServerError });
    let openResult = yield openning(url, page);
    if (!openResult)
        return result_1.default.fail({ message: "Cant open Youtube Video", code: response_code_1.default.InternalServerError });
    return result_1.default.success({ message: `Open ${url} success`, result: browser, code: response_code_1.default.OK });
});
exports.openYoutubeVideo = openYoutubeVideo;
const checkFileExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        while (!(0, fs_1.existsSync)(path)) {
            yield (0, time_utils_1.delay)(300);
        }
    }
    catch (_a) {
        return "Download Failed";
    }
    return "Download Successfully";
});
const getUniquePath = (name) => {
    let num = 1;
    let newName = name;
    let folderPath = config_1.appConfigure.audioPath;
    let path = `${folderPath}${name}.wav`;
    while ((0, fs_1.existsSync)(path)) {
        newName = `${name}(${num}).wav`;
        path = `${folderPath}${newName}`;
        num++;
    }
    return path;
};
const downloadAudio = (url, name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ytdl_core_1.default.validateURL(url))
        return result_1.default.fail({ message: "URL is not valid", code: response_code_1.default.Accepted });
    let nameAfterSanitize = (0, string_utils_1.sanitizeFileName)(name, '_');
    const path = getUniquePath(nameAfterSanitize);
    let options = config_1.appConfigure.audioDownloadOptions;
    const result = (0, ffmpeg_service_1.getConvertAudioStream)(path, options);
    if (!result.success())
        return result_1.default.fail({ message: "Cant get FFMPEG Stream", code: response_code_1.default.InternalServerError });
    let ffmpegProcess = result.result;
    try {
        (0, ytdl_core_1.default)(url, { quality: 'highestaudio' }).pipe(ffmpegProcess.stdin);
    }
    catch (_a) {
        return result_1.default.fail({ message: "Error when download", code: response_code_1.default.InternalServerError });
    }
    let success = false;
    yield (0, time_utils_1.runWithTimeOut)(checkFileExist, config_1.appConfigure.downloadTimedOut, [path]).then(() => success = true)
        .catch(() => success = false);
    return success ? result_1.default.success({ message: `Download successful. File save at ${path}`, result: path, code: response_code_1.default.OK })
        : result_1.default.fail({ message: "Download timed out", code: response_code_1.default.InternalServerError });
});
exports.downloadAudio = downloadAudio;
//# sourceMappingURL=youtube-service.js.map