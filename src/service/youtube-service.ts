import puppeteer, { Page } from "puppeteer"
import Result from "../utils/result";
import { delay } from "../utils/time-utils";
import ytdl from "ytdl-core";

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

export const verifyYoutubeVideoPlayback = async (curPage: Page): Promise<Result<number>> => {
    // checking if something wrong and cant find the main video
    let isHaveVideo = await curPage.$('.video-stream');
    if (!isHaveVideo) return Result.fail(500, "Verify failed");

    await skipOrWaitAds(curPage);
    await curPage.$eval('.video-stream', el => {
        const video = el as HTMLVideoElement;
        if (video.paused) video.play();
    });

    return Result.success(200, "Verify Successful");
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

    if (page == null) return Result.fail(null, "Something wrong");

    let openResult = await openning(url, page);
    if (!openResult) return Result.fail(null, "Cant open Youtube Video");

    return Result.success(browser, `Open ${url} success`);
}

export const downloadAudio = async (url: string) => {
    if (!ytdl.validateURL(url)) return Result.fail(null, "URL is not valid");

    let stream = ytdl(url, { quality: 'highestaudio' });

}