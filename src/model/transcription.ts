import mongoose, { Schema } from "mongoose";
import { transcriptWordSchema } from "./transcriptionWord";

export const transcriptSchema = new Schema({
    language_code: String,
    language_probability: Number,
    text: String,
    words: [transcriptWordSchema],
    transcriptionId: { type: String, required: true }
});

export const TranscriptModel = mongoose.model('transcripts', transcriptSchema);