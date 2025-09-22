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
const transcriptionRepository_1 = __importDefault(require("../repository/transcriptionRepository"));
const transcriptService = {
    create(transcript, screenshot, aiProbability) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transcriptionRepository_1.default.create(transcript, screenshot, aiProbability);
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transcriptionRepository_1.default.findById(id);
        });
    }
};
exports.default = transcriptService;
//# sourceMappingURL=transcript-service.js.map