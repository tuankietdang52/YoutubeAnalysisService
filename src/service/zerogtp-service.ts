import axios from "axios";
import Result from "../utils/result";
import HttpStatus from "../utils/response-code";

const url = "https://api.zerogpt.com/api/detect/detectText";

export const detectAI = async (text: string) => {
    const inputData = {
        input_text: text
    };
    const reqOptions = {
        headers: {
            'ApiKey': process.env.ZEROGPT_API_KEY
        },
        redirect: 'follow'
    };

    try {
        const response = await axios.post(url, inputData, reqOptions);
        const data = response.data as { data: { fakePercentage: number } };
        const aiProbability = data.data.fakePercentage;

        return Result.success({ message: "AI Detect successful", code: HttpStatus.OK, result: aiProbability })
    }
    catch (e) {
        return Result.fail({ message: `${e}`, code: HttpStatus.InternalServerError });
    }
}