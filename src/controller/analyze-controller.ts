import { Request, Response } from "express";
import { analyzing } from "../service/analyze-service";
import { sendMessageOnlyResult, sendResult } from "../utils/result";
import HttpStatus from "../utils/response-code";

export const analyzeYoutubeVideo = async (req: Request, res: Response) => {
    if (!req.body || !req.body.url) return res.status(HttpStatus.BadRequest).send("Missing URL");
    let result = await analyzing(req.body.url);

    if (!result.success()) return sendMessageOnlyResult(result, res);
    return sendResult(result, res);
}