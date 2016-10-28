"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    // Default-Constuctor
    function HTTPError(message, httpCode // Fallback to 500
        ) {
        if (httpCode === void 0) { httpCode = 500; }
        _super.call(this, message);
        this.httpCode = httpCode;
        this.message = message;
        this.stack = (new Error()).stack;
    }
    HTTPError.prototype.toString = function () {
        return this.name + ': ' + this.message;
    };
    HTTPError.prototype.getProductionError = function () {
        var _this = Object.assign({}, this);
        delete _this.stack;
        delete _this.httpCode;
        return _this;
    };
    return HTTPError;
}(Error));
exports.HTTPError = HTTPError;
//# sourceMappingURL=HTTPError.js.map