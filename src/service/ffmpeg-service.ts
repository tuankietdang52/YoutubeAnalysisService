import { spawn } from "child_process";
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

const getOptions = (option: FFMPEGOption | null): string[] => {
    if (!option) return [];
    let optionString: string[] =  [];

    if (option.videoFilter)   optionString.push("-vf", option.videoFilter);
    if (option.videoCodec) optionString.push("-c:v", option.videoCodec);
    if (option.audioFilter) optionString.push("-af", option.audioFilter);
    if (option.audioCodec) optionString.push("-c:a", option.audioCodec);
    if (option.duration) optionString.push("-t", option.duration);
    if (option.startTime) optionString.push("-ss", option.startTime);
    if (option.frameRate) optionString.push("-r", `${option.frameRate}`);
    if (option.videoBitrate) optionString.push("-b:v", option.videoBitrate);
    if (option.audioBitrate) optionString.push("-b:a", option.audioBitrate); // fixed from -b:c to -b:a
    if (option.sampleRate) optionString.push("-ar", `${option.sampleRate}`);
    if (option.channel) optionString.push("-ac", `${option.channel}`);
    if (option.PCM) optionString.push("-sample_fmt", option.PCM);

    return optionString;
}

export const getConvertAudioStream = (outputPath: string, option: FFMPEGOption | null) => {
    let optionString = getOptions(option);
    
    let ffmpegPath = process.env.FFMPEG_PATH as string;
    const ffmpeg = spawn(ffmpegPath, [
        '-i', 'pipe:0',
        '-f', 'wav',
        ...optionString,
        outputPath,
    ]);

    ffmpeg.stderr.on("data", data => {
        return Result.fail({ message: `FFMPEG Command fail. Data: ${data}`, code: HttpStatus.InternalServerError });
    });

    return Result.success({ message: "Conversion Success", result: ffmpeg, code: HttpStatus.OK });
}