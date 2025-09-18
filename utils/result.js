export default class Result {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    set(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    isSuccess() {
        return this.statusCode == 200;
    }
}