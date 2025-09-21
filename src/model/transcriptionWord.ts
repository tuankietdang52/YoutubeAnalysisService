import mongoose, { Schema } from "mongoose";

export interface TranscriptWord {
    text: string,
    start: number,
    end: number,
    type: string,
    logprob: number
}

export const transcriptWordSchema = new Schema({
    text: String,
    start: Number,
    end: Number,
    type: String,
    logprob: Number
})