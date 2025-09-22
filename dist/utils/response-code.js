"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["Created"] = 201] = "Created";
    HttpStatus[HttpStatus["Accepted"] = 202] = "Accepted";
    HttpStatus[HttpStatus["NoContent"] = 204] = "NoContent";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["Forbidden"] = 403] = "Forbidden";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["Conflict"] = 409] = "Conflict";
    HttpStatus[HttpStatus["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
    HttpStatus[HttpStatus["NotImplemented"] = 501] = "NotImplemented";
    HttpStatus[HttpStatus["BadGateway"] = 502] = "BadGateway";
    HttpStatus[HttpStatus["ServiceUnavailable"] = 503] = "ServiceUnavailable";
})(HttpStatus || (HttpStatus = {}));
exports.default = HttpStatus;
//# sourceMappingURL=response-code.js.map