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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWithTimeOut = exports.delay = void 0;
const delay = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => setTimeout(resolve, ms));
});
exports.delay = delay;
const runWithTimeOut = (task, ms, para) => __awaiter(void 0, void 0, void 0, function* () {
    const timedOutTask = new Promise((_, reject) => setTimeout(() => reject(new Error("Task timed out")), ms));
    if (task.length == 0) {
        return Promise.race([task(), timedOutTask]);
    }
    else {
        const taskWithPara = task;
        return Promise.race([taskWithPara(...para), timedOutTask]);
    }
});
exports.runWithTimeOut = runWithTimeOut;
//# sourceMappingURL=time-utils.js.map