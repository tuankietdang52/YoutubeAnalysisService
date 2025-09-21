import cloudinary from "cloudinary"
import Result from "../utils/result";
import HttpStatus from "../utils/response-code";

export const uploadImage = async (imagePath: string) => {
    try { 
        const response = await cloudinary.v2.uploader.upload(imagePath);
        return Result.success({ message: "Upload successfully", result: response.secure_url, code: HttpStatus.OK })
    }
    catch {
        return Result.fail({ message: "Upload failed", code: HttpStatus.InternalServerError });
    }
}