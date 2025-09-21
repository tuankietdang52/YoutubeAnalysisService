import { SpeechToTextConvertResponse } from "@elevenlabs/elevenlabs-js/api";
import transcriptRepo from "../repository/transcriptionRepository"

const transcriptService = {
    async create(transcript: SpeechToTextConvertResponse, screenshot: string, aiProbability: number) {
        return await transcriptRepo.create(transcript, screenshot, aiProbability);
    },

    async findById(id: string) {
        return await transcriptRepo.findById(id);
    }
}

export default transcriptService;