import ytdl from "ytdl-core";
import { openYoutubeVideo, verifyYoutubeVideoPlayback } from "../service/youtube-service";
import { delay } from "../utils/time-utils";
import { Request, RequestHandler, Response } from "express";
import { Browser } from "puppeteer";

export const analyzing = async (req: Request, res: Response) => {
    if (!req.body || !req.body.url) return res.status(400).send("Missing URL");

    const url = req.body.url;
    if (!ytdl.validateURL(url)) return res.status(400).send("Invalid youtube video url");

    let openResult = await openYoutubeVideo(url);
    if (!openResult.isSuccess()) {
        return res.status(500).send(openResult.message);
    }

    console.log(openResult.message);
    
    let browser = openResult.result as Browser;
    let pages = await browser.pages();
    let page = pages[0];

    let verifyResult = await verifyYoutubeVideoPlayback(page);

    await delay(1000);
    await page.screenshot({
        path: 'screenshots/thumbnailScreenshot.png',
    });
    
    return verifyResult.isSuccess() ? res.status(200).send(verifyResult.message) : res.status(500).send(verifyResult.message);
}