import cloudinary from "cloudinary"
import Result from "../utils/result";

export const uploadImage = async (imagePath: string) => {
    try { 
        const response = await cloudinary.v2.uploader.upload(imagePath);
        return Result.success({ message: "Upload successfully", result: response.secure_url, code: 200 })
    }
    catch {
        return Result.fail({ message: "Upload failed", code: 500 });
    }
}