"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConvertAudioStream = void 0;
const child_process_1 = require("child_process");
const result_1 = __importDefault(require("../utils/result"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const getOptions = (option) => {
    if (!option)
        return [];
    let optionString = [];
    if (option.videoFilter)
        optionString.push("-vf", option.videoFilter);
    if (option.videoCodec)
        optionString.push("-c:v", option.videoCodec);
    if (option.audioFilter)
        optionString.push("-af", option.audioFilter);
    if (option.audioCodec)
        optionString.push("-c:a", option.audioCodec);
    if (option.duration)
        optionString.push("-t", option.duration);
    if (option.startTime)
        optionString.push("-ss", option.startTime);
    if (option.frameRate)
        optionString.push("-r", `${option.frameRate}`);
    if (option.videoBitrate)
        optionString.push("-b:v", option.videoBitrate);
    if (option.audioBitrate)
        optionString.push("-b:a", option.audioBitrate); // fixed from -b:c to -b:a
    if (option.sampleRate)
        optionString.push("-ar", `${option.sampleRate}`);
    if (option.channel)
        optionString.push("-ac", `${option.channel}`);
    if (option.PCM)
        optionString.push("-sample_fmt", option.PCM);
    return optionString;
};
const getConvertAudioStream = (outputPath, option) => {
    let optionString = getOptions(option);
    let ffmpegPath = process.env.FFMPEG_PATH;
    const ffmpeg = (0, child_process_1.spawn)(ffmpegPath, [
        '-i', 'pipe:0',
        '-f', 'wav',
        ...optionString,
        outputPath,
    ]);
    ffmpeg.stderr.on("data", data => {
        return result_1.default.fail({ message: `FFMPEG Command fail. Data: ${data}`, code: response_code_1.default.InternalServerError });
    });
    return result_1.default.success({ message: "Conversion Success", result: ffmpeg, code: response_code_1.default.OK });
};
exports.getConvertAudioStream = getConvertAudioStream;
//# sourceMappingURL=ffmpeg-service.js.map