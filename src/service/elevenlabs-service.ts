import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { readFileSync } from "fs";
import Result from "../utils/result";

const client = new ElevenLabsClient();

export const transcriptAudio = async (audioPath: string) => {
    try {
        const audioFile = readFileSync(audioPath);
        const transcription = await client.speechToText.convert({
        file: audioFile,
        modelId: "scribe_v1"});

        return Result.success({ result: transcription, code: 200, message: "Get Transcript Successfully" });
    }
    catch (e) {
        let message = e instanceof Error ? e.message : "Error when transcript";
        return Result.fail({ message: message, code: 500 });
    }
}