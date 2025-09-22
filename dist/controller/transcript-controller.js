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
exports.getResult = void 0;
const transcript_service_1 = __importDefault(require("../service/transcript-service"));
const response_code_1 = __importDefault(require("../utils/response-code"));
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transcript = yield transcript_service_1.default.findById(id);
        return transcript ? res.status(response_code_1.default.OK).json(transcript) : res.status(response_code_1.default.OK).send(`No record match id: ${id}`);
    }
    catch (_a) {
        return res.status(response_code_1.default.BadRequest).send("Id is not valid");
    }
});
exports.getResult = getResult;
//# sourceMappingURL=transcript-controller.js.map