import puppeteer from "puppeteer"
import { isYoutubeVideoUrl } from "../utils/string-utils.js";
import Result from "../utils/result.js";
import { delay } from "../utils/time-utils.js";

const openYoutubeVideo = async (url, page) => {
    if (!isYoutubeVideoUrl(url)) {
        return new Result(400, "Invalid youtube video url");
    }

    const res = new Result();
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
             .then(() => res.set(200, `Open ${url}`))
             .catch(e => res.set(500, e.message))

    return res;
}

const verifyPlayback = async (curPage) => {
    // checking if something wrong and cant find the main video
    let isHaveVideo = await curPage.$('.video-stream');
    if (!isHaveVideo) return false;

    await skipOrWaitAds(curPage);
    await curPage.$eval('.video-stream', el => {
        if (el.paused) el.play();
    });

    await delay(1000);
    await curPage.screenshot({
        path: 'screenshots/thumbnailScreenshot.png',
    });
}

const skipOrWaitAds = async (curPage) => {
    // trying to click skip ad but not working, this function is only waiting for ads

    await curPage.$eval('.video-stream', el => {
        if (el.paused) el.play();
    });

    let isAdPlaying = true;
    while (isAdPlaying) {
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
}

export const analyzing = async (req, res) => {
    if (!req.body || !req.body.url) return res.status(400).send("Missing URL");

    const browser = await puppeteer.launch();
    const pages = await browser.pages();
    const page = pages[0];

    let result = await openYoutubeVideo(req.body.url, page);
    if (!result.isSuccess()) res.status(result.statusCode).json(result.message);

    await verifyPlayback(page);

    return res.status(result.statusCode).json(result.message);
}