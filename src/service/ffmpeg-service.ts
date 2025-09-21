import ffmpegPath from "ffmpeg-static";
import { ChildProcess, exec, spawn } from "child_process";
import Result from "../utils/result";
import HttpStatus from "../utils/response-code";

type TimeFormat = `${number}:${number}:${number}`;

export interface FFMPEGOption {
    videoFilter?: string;
    videoCodec?: string;
    audioFilter?: string;
    audioCodec?: string;
    duration?: TimeFormat;
    startTime?: TimeFormat;
    frameRate?: number;
    videoBitrate?: string;
    audioBitrate?: string;
    sampleRate?: number;
    channel?: number;
    PCM?: string;
}

const getOptions = (option: FFMPEGOption | null): string => {
    if (!option) return "";
    let optionString =  "";

    if (option.videoFilter) optionString += `-vf ${option.videoFilter }`
    if (option.videoCodec) optionString += `-c:v ${option.videoCodec} `
    if (option.audioFilter) optionString += `-af ${option.audioFilter} `
    if (option.audioCodec) optionString += `-c:a ${option.audioCodec} `
    if (option.duration) optionString += `-t ${option.duration} `
    if (option.startTime) optionString += `-ss ${option.startTime} `
    if (option.frameRate) optionString += `-r ${option.frameRate} `
    if (option.videoBitrate) optionString += `-b:v ${option.videoBitrate} `
    if (option.audioBitrate) optionString += `-b:c ${option.audioBitrate} `
    if (option.sampleRate) optionString += `-ar ${option.sampleRate} `
    if (option.channel) optionString += `-ac ${option.channel} `
    if (option.PCM) optionString += `-sample_fmt ${option.PCM} `

    return optionString;
}

export const convertAudioTo = (inputPath: string, outputPath: string, option: FFMPEGOption | null) => {
    let optionString = getOptions(option);
    
    exec(`${ffmpegPath} -i ${inputPath} ${optionString} ${outputPath}`, (err, stdout, sterr) => {
        if (err) {
            return Result.fail({ message: err.message, code: HttpStatus.InternalServerError });
        }

        return Result.success({ message: "Conversion Success", code: HttpStatus.OK });
    })
}

export const getConvertAudioStream = (outputPath: string, option: FFMPEGOption | null): Result<ChildProcess> | Result<null> => {
    let optionString = getOptions(option);
    let command = `"${ffmpegPath}" -i pipe:0 ${optionString} "${outputPath}"`;
    
    let stream = exec(command, (err, stdout, sterr) => {
        if (err) {
            return Result.fail({ message: err.message, code: HttpStatus.InternalServerError });
        }
    })

    return Result.success({ message: "Success", result: stream });
}