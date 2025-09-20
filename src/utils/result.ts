export default class Result<T> {
    #isSuccess: boolean = false;
    result: T;
    message: string

    constructor(isSuccess: boolean, result: T, message: string) {
        this.#isSuccess = isSuccess;
        this.result = result;
        this.message = message;
    }

    static success<T>(result: T, message: string) {
        return new Result(true, result, message);
    }

    static fail<T>(result: T, message: string) {
        return new Result(false, result, message);
    }

    isSuccess() {
        return this.#isSuccess;
    }
}