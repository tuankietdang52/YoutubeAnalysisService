"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Result_isSuccess;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessageType = void 0;
exports.sendResult = sendResult;
exports.sendMessageOnlyResult = sendMessageOnlyResult;
var ResponseMessageType;
(function (ResponseMessageType) {
    ResponseMessageType[ResponseMessageType["NORMAL"] = 0] = "NORMAL";
    ResponseMessageType[ResponseMessageType["JSON"] = 1] = "JSON";
})(ResponseMessageType || (exports.ResponseMessageType = ResponseMessageType = {}));
class Result {
    constructor(isSuccess, properties) {
        _Result_isSuccess.set(this, false);
        this.code = 0;
        this.result = null;
        this.message = "";
        __classPrivateFieldSet(this, _Result_isSuccess, isSuccess, "f");
        if (properties.message)
            this.message = properties.message;
        if (typeof properties.result === 'number') {
            this.result = properties.result;
        }
        else if (properties.result) {
            this.result = properties.result;
        }
        if (properties.code)
            this.code = properties.code;
    }
    static success(properties) {
        return new Result(true, properties);
    }
    static fail(properties) {
        return new Result(false, properties);
    }
    success() {
        return __classPrivateFieldGet(this, _Result_isSuccess, "f");
    }
}
_Result_isSuccess = new WeakMap();
exports.default = Result;
function sendResult(result, res, sendAs = ResponseMessageType.NORMAL) {
    const body = {
        message: result.message,
        data: result.result
    };
    return sendAs == ResponseMessageType.NORMAL ? res.status(result.code).send(body)
        : res.status(result.code).json(body);
}
function sendMessageOnlyResult(result, res, sendAs = ResponseMessageType.NORMAL) {
    return sendAs == ResponseMessageType.NORMAL ? res.status(result.code).send(result.message)
        : res.status(result.code).json(result.message);
}
//# sourceMappingURL=result.js.map