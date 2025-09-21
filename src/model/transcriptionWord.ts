import mongoose, { Schema } from "mongoose";

export const transcriptWordSchema = new Schema({
    text: String,
    start: Number,
    end: Number,
    type: String,
    logprob: Number
})