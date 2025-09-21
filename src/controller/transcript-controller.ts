import { Request, Response } from "express";
import transcriptService from "../service/transcript-service";
import HttpStatus from "../utils/response-code";

export const getResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transcript = await transcriptService.findById(id);
    
        return transcript ? res.status(HttpStatus.OK).json(transcript) : res.status(HttpStatus.OK).send(`No record match id: ${id}`);
    }
    catch {
        return res.status(HttpStatus.BadRequest).send("Id is not valid");
    }
}