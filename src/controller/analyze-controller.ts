import ytdl from "@distube/ytdl-core";
import { downloadAudio, openYoutubeVideo, verifyYoutubeVideoPlayback } from "../service/youtube-service";
import { delay } from "../utils/time-utils";
import { Request, Response } from "express";
import { Browser, Page } from "puppeteer";
import Result, { sendResult } from "../utils/result";
import { transcriptAudio } from "../service/elevenlabs-service";
import { SpeechToTextConvertResponse } from "@elevenlabs/elevenlabs-js/api";
import { TranscriptModel } from "../model/transcription";
import mongoose from "mongoose";
import { uploadImage } from "../service/cloudinary-service";

const openYoutubeTask = async (url: string) => {
    if (!ytdl.validateURL(url)) return Result.fail({ message: "Invalid youtube video url", code: 400});
    return await openYoutubeVideo(url);
}

const verifyYoutubeVideoPlaybackTask = async (curPage: Page) => {
    return await verifyYoutubeVideoPlayback(curPage);
}

const screenshotTask = async (curPage: Page) => {
    const title = await curPage.title();
    const path = `${process.env.SCREENSHOT_PATH}${title}Screenshot`;

    await delay(1000);
    await curPage.screenshot({
        path: `${path}.png`,
    });

    console.log("Screenshot success")
    return await uploadImage(`${path}.png`);
}

const saveTranscript = async (transcript: SpeechToTextConvertResponse, screenshot: string) => {
    const transcriptModel = new TranscriptModel({
        ...transcript,
        screenshot: screenshot
    });

    console.log(transcriptModel);

    await transcriptModel.save().then(() => console.log("Save successfully"))
                                .catch((err) => console.log(err));
}

export const analyzing = async (req: Request, res: Response) => {
    if (!req.body || !req.body.url) return res.status(400).send("Missing URL");

    const url = req.body.url;

    let openResult = await openYoutubeTask(url);
    if (!openResult.success()) return sendResult(openResult, res);
    console.log(openResult.message);
    
    let browser = openResult.result as Browser;
    let pages = await browser.pages();
    let page = pages[0];

    let verifyResult = await verifyYoutubeVideoPlaybackTask(page);
    if (!verifyResult.success()) return sendResult(verifyResult, res);
    console.log(verifyResult.message);

    let screenshotResult = await screenshotTask(page);
    if (!screenshotResult.success()) return sendResult(screenshotResult, res);

    console.log("Upload Image Successfully")

    let downloadResult = await downloadAudio(url);
    if (!downloadResult.success()) return sendResult(downloadResult, res);

    console.log(downloadResult.message);
    console.log(downloadResult.result);

    let audioPath = downloadResult.result as string;
    await delay(2000);

    let transcriptionResult = await transcriptAudio(audioPath);
    if (!transcriptionResult.success()) return sendResult(transcriptionResult, res);

    console.log("Transcript success");
    let transcript = transcriptionResult.result as SpeechToTextConvertResponse;

    saveTranscript(transcript, screenshotResult.result as string);

    return res.sendStatus(200);
}