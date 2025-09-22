"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const result_1 = __importDefault(require("../utils/result"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const uploadImage = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cloudinary_1.default.v2.uploader.upload(imagePath);
        return result_1.default.success({ message: "Upload successfully", result: response.secure_url, code: response_code_1.default.OK });
    }
    catch (_a) {
        return result_1.default.fail({ message: "Upload failed", code: response_code_1.default.InternalServerError });
    }
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinary-service.js.map