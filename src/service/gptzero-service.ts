import axios from "axios"
import puppeteer from "puppeteer-extra"
import { delay } from "../utils/time-utils";
import StealthMode from "puppeteer-extra-plugin-stealth"

puppeteer.use(StealthMode())

export const detectAI = async (text: string) => {
    let browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    let pages = await browser.pages();
    let page = pages[0];

    await page.setViewport({
      width: Math.floor(1024 + Math.random() * 100),
      height: Math.floor(768 + Math.random() * 100),
    });

    await page.goto("https://app.gptzero.me");

    setTimeout(async () => await page.$$eval('input', els => {
        let input = els[0];
        input.click();
    }), 15000)

    // await page.type('textarea', 'shibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashibahibashibashibashibashibashibashibashibashibashibashibashiba');
    // await page.$eval('.cl-flex.cl-items-center.cl-gap-2.cl-bg-g0-primary.cl-text-white.items-center', el => {
    //     let a = el as HTMLButtonElement;
    //     a.click();
    // });

    // Wait for result
    // await page.waitForSelector('.result-score');
    // const score = await page.$eval('.result-score', el => el.textContent);

    // console.log('GPTZero score:', score);
}