import ytdl from "@distube/ytdl-core";
import { downloadAudio, openYoutubeVideo, verifyYoutubeVideoPlayback } from "../service/youtube-service";
import { delay } from "../utils/time-utils";
import puppeteerExtra from "puppeteer-extra";
import { Browser, Page } from "puppeteer";
import Result from "../utils/result";
import { transcriptAudio } from "../service/elevenlabs-service";
import { SpeechToTextConvertResponse } from "@elevenlabs/elevenlabs-js/api";
import { uploadImage } from "../service/cloudinary-service";
import { detectAI } from "../service/zerogtp-service";
import { sanitizeFileName } from "../utils/string-utils";
import { appConfigure } from "../config";
import transcriptService from "./transcript-service";
import HttpStatus from "../utils/response-code";

const openYoutubeTask = async (url: string) => {
    if (!ytdl.validateURL(url)) return Result.fail({ message: "Invalid youtube video url", code: HttpStatus.BadRequest});
    return await openYoutubeVideo(url);
}

const verifyYoutubeVideoPlaybackTask = async (curPage: Page) => {
    try {
        return await verifyYoutubeVideoPlayback(curPage);
    }
    catch (e) {
        return Result.fail( { message: `Verify failed. Error: ${e}`, code: HttpStatus.InternalServerError} );
    }
}

const screenshotTask = async (curPage: Page, title: string) => {
    let newTitle = sanitizeFileName(title, '_');
    const path = `${process.env.SCREENSHOT_PATH}${newTitle}_Screenshot`;

    await delay(1000);
    await curPage.screenshot({
        path: `${path}.png`,
    });

    console.log(`Screenshot success. File save at ${path}.png`)
    return await uploadImage(`${path}.png`);
}

const saveTranscript = async (transcript: SpeechToTextConvertResponse, screenshot: string, aiProbability: number) => {
    try {
        const model = await transcriptService.create(transcript, screenshot, aiProbability);
        return Result.success({ message: "Save successfully", code: HttpStatus.OK, result: model});
    }
    catch (e) {
        return Result.fail({ message: `Save failed. Error: ${e}`, code: HttpStatus.InternalServerError });
    }
}

export const analyzing = async (url: string) => {
    const openResult = await openYoutubeTask(url);
    if (!openResult.success()) return Result.fail({ code: HttpStatus.InternalServerError, message: openResult.message });
    console.log(openResult.message);
    
    let browser = openResult.result as Browser;
    let pages = await browser.pages();
    let page = pages[0];
    await page.setViewport({width: 1920, height: 1060}); 

    let title = await page.title();

    const verifyResult = await verifyYoutubeVideoPlaybackTask(page);
    if (!verifyResult.success()) {
        let content = await page.content();
        return Result.fail({ code: HttpStatus.InternalServerError, message: `${verifyResult.message}. Error: \n ${content}` });
    }
    console.log(verifyResult.message);

    const screenshotResult = await screenshotTask(page, title);
    if (!screenshotResult.success()) return Result.fail({ code: HttpStatus.InternalServerError, message: screenshotResult.message });

    console.log("Upload Image Successfully")

    const downloadResult = await downloadAudio(url, title);
    if (!downloadResult.success()) return Result.fail({ code: HttpStatus.InternalServerError, message: downloadResult.message });

    console.log(downloadResult.message);

    let audioPath = downloadResult.result as string;
    await delay(2000);

    const transcriptionResult = await transcriptAudio(audioPath);
    if (!transcriptionResult.success()) return Result.fail({ code: HttpStatus.InternalServerError, message: transcriptionResult.message });

    console.log("Transcript success");
    let transcript = transcriptionResult.result as SpeechToTextConvertResponse;
    let text = (transcript as { text: string }).text;

    const detectAIResult = await detectAI(text);
    if (!detectAIResult.success()) return Result.fail({ code: HttpStatus.InternalServerError, message: detectAIResult.message });;
    console.log("Detect success");

    const saveResult = await saveTranscript(transcript, screenshotResult.result as string, detectAIResult.result as number);
    browser.close();

    return saveResult;
}