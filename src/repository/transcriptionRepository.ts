import { SpeechToTextConvertResponse } from "@elevenlabs/elevenlabs-js/api";
import { TranscriptModel } from "../model/transcription"

const transcriptRepository = {
    async create(transcript: SpeechToTextConvertResponse, screenshot: string, aiProbability: number) {
        try {
            let data = new TranscriptModel({
                ...transcript,
                screenshot: screenshot,
                ai_probability: aiProbability
            });
            return await data.save()
        }
        catch {
            return null;
        }
    },
    
    async findById(id: string) {
        return await TranscriptModel.findById(id);
    }
} 

export default transcriptRepository;