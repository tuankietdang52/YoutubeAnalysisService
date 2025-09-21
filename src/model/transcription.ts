import mongoose, { Schema } from "mongoose";
import { TranscriptWord, transcriptWordSchema } from "./transcriptionWord";

export interface Transcript {
    language_code: string,
    language_probability: number,
    text: String,
    words: [TranscriptWord],
    transcriptionId: string,
    ai_probability: number,
    screenshot: string
}

export const transcriptSchema = new Schema({
    language_code: String,
    language_probability: Number,
    text: String,
    words: [transcriptWordSchema],
    transcriptionId: { type: String, required: true },
    ai_probability: Number,
    screenshot: String
});

export const TranscriptModel = mongoose.model('transcripts', transcriptSchema);