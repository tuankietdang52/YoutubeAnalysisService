"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAI = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const time_utils_1 = require("../utils/time-utils");
const gptZeroCheckTextUrl = "https://gptzero.stoplight.io/docs/gptzero-api/d2144a785776b-ai-detection-on-single-string";
const detectAI = (text) => __awaiter(void 0, void 0, void 0, function* () {
    let browser = yield puppeteer_1.default.launch({
        headless: false,
        args: ['--proxy-server=https://48.218.198.55:8080', '--no-sandbox']
    });
    let pages = yield browser.pages();
    let page = pages[0];
    page.on('response', (response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let url = response.url();
            let body = yield response.text();
            let json = JSON.parse(body);
            console.log(Object.assign({ url: url }, json));
        }
        catch (err) {
        }
    }));
    yield page.goto(gptZeroCheckTextUrl, { waitUntil: 'networkidle2' });
    yield (0, time_utils_1.delay)(3000);
    // await page.$eval('.npm__react-simple-code-editor__textarea', el => {
    //     let textArea = el as HTMLTextAreaElement;
    //     textArea.value = `{
    //       "document": "shibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashibashiba",
    //       "multilingual": false
    //     }`
    // });
    // await delay(2000);
    let holder = yield page.$('.SendButtonHolder');
    yield (holder === null || holder === void 0 ? void 0 : holder.$eval('button', el => {
        let button = el;
        button.click();
    }));
    yield (0, time_utils_1.delay)(3000);
    // await page.$eval('.cl-flex.cl-items-center.cl-gap-2.cl-bg-g0-primary.cl-text-white.items-center', el => {
    //     let a = el as HTMLButtonElement;
    //     a.click();
    // });
    // Wait for result
    // await page.waitForSelector('.result-score');
    // const score = await page.$eval('.result-score', el => el.textContent);
    // console.log('GPTZero score:', score);
});
exports.detectAI = detectAI;
//# sourceMappingURL=gptzero-service.js.map