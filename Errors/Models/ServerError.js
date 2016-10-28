"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var codes = require('../Codes/ServerCodes');
var HTTPError_1 = require('./HTTPError');
exports.ServerCodes = codes;
var ServerError = (function (_super) {
    __extends(ServerError, _super);
    // Default-Constuctor
    function ServerError(identifier, exendedMessage, httpCode) {
        if (httpCode === void 0) { httpCode = identifier.httpCode || 500; }
        _super.call(this, identifier.message, httpCode);
        this.exendedMessage = exendedMessage;
        this.code = identifier.code;
    }
    ServerError.prototype.getProductionError = function () {
        var _this = Object.assign({}, _super.prototype.getProductionError.call(this));
        // Remove all direct messages for production errors
        delete _this.message;
        delete _this.exendedMessage;
        return _this;
    };
    return ServerError;
}(HTTPError_1.HTTPError));
exports.ServerError = ServerError;
//# sourceMappingURL=ServerError.js.map