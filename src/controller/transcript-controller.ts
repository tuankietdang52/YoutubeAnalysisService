import { Request, Response } from "express";
import { TranscriptModel } from "../model/transcription"

export const getResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    const transcript = await TranscriptModel.findById(id);
    
    return res.status(200).json(transcript);
}