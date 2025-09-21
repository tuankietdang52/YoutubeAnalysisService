import puppeteer, { Page } from "puppeteer"
import Result from "../utils/result";
import { delay, runWithTimeOut } from "../utils/time-utils";
import ytdl from "@distube/ytdl-core";
import { getConvertAudioStream } from "./ffmpeg-service";
import { ChildProcess } from "child_process";
import { existsSync } from "fs";

const skipOrWaitAds = async (curPage: Page) => {
    // trying to click skip ad but not working, this function is only waiting for ads

    await curPage.$eval('.video-stream', el => {
        const video = el as HTMLVideoElement;
        if (video.paused) video.play();
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

        isAdPlaying = await curPage.$('div.ad-showing');
        if(isAdPlaying) delay(1000);
    }
    while (isAdPlaying);

}

export const verifyYoutubeVideoPlayback = async (curPage: Page): Promise<Result<null>> => {
    // checking if something wrong and cant find the main video
    let isHaveVideo = await curPage.$('.video-stream');
    if (!isHaveVideo) return Result.fail({ message: "Verify failed", code: 500 });

    await skipOrWaitAds(curPage);
    await curPage.$eval('.video-stream', el => {
        const video = el as HTMLVideoElement;
        if (video.paused) video.play();
    });

    return Result.success({ message: "Verify Successful", code: 200 });
}

const openning = async (url: string, page: Page) => {
    let isOpenSuccess = false;
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
             .then(() => isOpenSuccess = true)
             .catch(e => isOpenSuccess = false)

    return isOpenSuccess;
}

export const openYoutubeVideo = async (url: string) => {
    const browser = await puppeteer.launch();
    const pages = await browser.pages();
    const page = pages[0];

    if (page == null) return Result.fail({ message: "Something wrong", code: 500 });

    let openResult = await openning(url, page);
    if (!openResult) return Result.fail({ message: "Cant open Youtube Video", code: 500 });

    return Result.success({ message: `Open ${url} success`, result: browser, code: 200 });
}

const checkFileExist = async (path: string): Promise<string> => {
    try {
        while (!existsSync(path)) {
            await delay(300);
        }
    }
    catch {
        return "Download Failed";
    }

    return "Download Successfully";
}

const getUniquePath = (): string => {
    let name = "audio.wav";
    let num = 1;
    let folderPath = process.env.AUDIO_PATH as string;
    let path = `${folderPath}${name}`;

    while (existsSync(path)) {
        name = `audio(${num}).wav`;
        path = `${folderPath}${name}`;
        num++;
    }

    return path;
}

export const downloadAudio = async (url: string) => {
    if (!ytdl.validateURL(url)) return Result.fail({ message: "URL is not valid", code: 200 });

    const path = getUniquePath();
    const result = getConvertAudioStream(path, { sampleRate: 16000, channel: 1, PCM: "s16" });
    
    if (!result.success()) return Result.fail({ message: "Cant get FFMPEG Stream", code: 500 });

    let ffmpegProcess = result.result as ChildProcess;
    try {
        ytdl(url, { quality: 'highestaudio' }).pipe(ffmpegProcess.stdin!);
    }
    catch {
        return Result.fail({ message: "Error when download", code: 500 });
    }

    let success = false;
    await runWithTimeOut(checkFileExist, 30000, [path]).then(() => success = true)
                                                       .catch(() => success = false);

    return success ? Result.success({ message: "Download successful", result: path, code: 200 })
                    : Result.fail({ message: "Download timed out", code: 500 });
}