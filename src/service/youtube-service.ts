import puppeteer, { Page } from "puppeteer"
import puppeteerExtra from "puppeteer-extra"
import StealthMode from "puppeteer-extra-plugin-stealth"
import Result from "../utils/result";
import { delay, runWithTimeOut } from "../utils/time-utils";
import ytdl from "@distube/ytdl-core";
import { FFMPEGOption, getConvertAudioStream } from "./ffmpeg-service";
import { ChildProcess } from "child_process";
import { existsSync } from "fs";
import { sanitizeFileName } from "../utils/string-utils";
import { appConfigure } from "../config";
import HttpStatus from "../utils/response-code";

puppeteerExtra.use(StealthMode());

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
    await curPage.waitForSelector('.video-stream', { timeout: appConfigure.verifyTimedOut });

    await skipOrWaitAds(curPage);
    await curPage.$eval('.video-stream', el => {
        const video = el as HTMLVideoElement;
        if (video.paused) video.play();
    });

    return Result.success({ message: "Verify Successful", code: HttpStatus.OK });
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
    const browser = await puppeteerExtra.launch({ 
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--use-gl=egl",
        ]
    });
    const pages = await browser.pages();
    const page = pages[0];

    if (page == null) return Result.fail({ message: "Something wrong", code: HttpStatus.InternalServerError });

    let openResult = await openning(url, page);
    if (!openResult) return Result.fail({ message: "Cant open Youtube Video", code: HttpStatus.InternalServerError });

    return Result.success({ message: `Open ${url} success`, result: browser, code: HttpStatus.OK });
}

const checkFileExist = async (path: string): Promise<string> => {
    try {
        while (!existsSync(path)) {
            await delay(300);
        }
    }
    catch (e) {
        return `Download Failed. Error: ${e}`;
    }

    return "Download Successfully";
}

const getUniquePath = (name: string): string => {
    let num = 1;
    let newName = name;
    let folderPath = process.env.AUDIO_PATH;
    let path = `${folderPath}${name}.wav`;

    while (existsSync(path)) {
        newName = `${name}(${num}).wav`;
        path = `${folderPath}${newName}`;
        num++;
    }

    return path;
}

export const downloadAudio = async (url: string, name: string) => {
    if (!ytdl.validateURL(url)) return Result.fail({ message: "URL is not valid", code: HttpStatus.Accepted });

    let nameAfterSanitize = sanitizeFileName(name, '_');
    const path = getUniquePath(nameAfterSanitize);

    let options: FFMPEGOption = appConfigure.audioDownloadOptions;
    const result = getConvertAudioStream(path, options);
    
    if (!result.success()) return result;

    let ffmpegProcess = result.result as ChildProcess;
    try {
        let stream = ytdl(url, { quality: 'highestaudio' }).on('info', (_, info) => console.log('Downloading audio... Info:', info))
                                                           .on('error', err => console.error('Error when try to download audio', err))

        stream.pipe(ffmpegProcess.stdin!).on('finish', () => console.log("Finish download"))
                                         .on('error', (err) => console.log(`FFMPEG Error. ${err}`))

        ffmpegProcess.on('close', code => {
            console.log(`FFMPEG code: ${code}`);
        });

        ffmpegProcess.stdin!.on('error', err => {
          console.error('FFMPEG Stdin error:', err);
        });
    }
    catch (e) {
        return Result.fail({ message: `Error when download: {e}`, code: HttpStatus.InternalServerError });
    }

    let success = false;
    await runWithTimeOut(checkFileExist, appConfigure.downloadTimedOut, [path]).then(() => success = true)
                                                       .catch(() => success = false);

    return success ? Result.success({ message: `Download successful. File save at ${path}`, result: path, code: HttpStatus.OK })
                    : Result.fail({ message: "Download timed out", code: HttpStatus.InternalServerError });
}