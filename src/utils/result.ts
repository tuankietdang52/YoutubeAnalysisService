import { Response } from "express";

interface ResultProperties<T> {
    code?: number;
    result?: T | null;
    message?: string;
}

export enum ResponseMessageType {
    NORMAL,
    JSON
}

export default class Result<T> {
    #isSuccess: boolean = false;
    code: number = 0;
    result: T | null = null;
    message: string = "";

    constructor(isSuccess: boolean, properties: ResultProperties<T | null>) {
        this.#isSuccess = isSuccess;
        if (properties.message) this.message = properties.message;
        if (properties.result) this.result = properties.result;
        if (properties.code) this.code = properties.code;
    }

    static success<T>(properties: ResultProperties<T | null>) {
        return new Result(true, properties);
    }

    static fail<T>(properties: ResultProperties<T | null>) {
        return new Result(false, properties);
    }

    success() {
        return this.#isSuccess;
    }
}

export function sendResult<T>(result: Result<T>, res: Response, sendAs: ResponseMessageType = ResponseMessageType.NORMAL) {
    return sendAs == ResponseMessageType.NORMAL ? res.status(result.code).send(result.message)
                                                : res.status(result.code).json(result.message);
}