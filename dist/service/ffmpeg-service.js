"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConvertAudioStream = exports.convertAudioTo = void 0;
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const child_process_1 = require("child_process");
const result_1 = __importDefault(require("../utils/result"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const getOptions = (option) => {
    if (!option)
        return "";
    let optionString = "";
    if (option.videoFilter)
        optionString += `-vf ${option.videoFilter}`;
    if (option.videoCodec)
        optionString += `-c:v ${option.videoCodec} `;
    if (option.audioFilter)
        optionString += `-af ${option.audioFilter} `;
    if (option.audioCodec)
        optionString += `-c:a ${option.audioCodec} `;
    if (option.duration)
        optionString += `-t ${option.duration} `;
    if (option.startTime)
        optionString += `-ss ${option.startTime} `;
    if (option.frameRate)
        optionString += `-r ${option.frameRate} `;
    if (option.videoBitrate)
        optionString += `-b:v ${option.videoBitrate} `;
    if (option.audioBitrate)
        optionString += `-b:c ${option.audioBitrate} `;
    if (option.sampleRate)
        optionString += `-ar ${option.sampleRate} `;
    if (option.channel)
        optionString += `-ac ${option.channel} `;
    if (option.PCM)
        optionString += `-sample_fmt ${option.PCM} `;
    return optionString;
};
const convertAudioTo = (inputPath, outputPath, option) => {
    let optionString = getOptions(option);
    (0, child_process_1.exec)(`${ffmpeg_static_1.default} -i ${inputPath} ${optionString} ${outputPath}`, (err, stdout, sterr) => {
        if (err) {
            return result_1.default.fail({ message: err.message, code: response_code_1.default.InternalServerError });
        }
        return result_1.default.success({ message: "Conversion Success", code: response_code_1.default.OK });
    });
};
exports.convertAudioTo = convertAudioTo;
const getConvertAudioStream = (outputPath, option) => {
    let optionString = getOptions(option);
    let command = `"${ffmpeg_static_1.default}" -i pipe:0 ${optionString} "${outputPath}"`;
    let stream = (0, child_process_1.exec)(command, (err, stdout, sterr) => {
        if (err) {
            return result_1.default.fail({ message: err.message, code: response_code_1.default.InternalServerError });
        }
    });
    return result_1.default.success({ message: "Success", result: stream });
};
exports.getConvertAudioStream = getConvertAudioStream;
//# sourceMappingURL=ffmpeg-service.js.map