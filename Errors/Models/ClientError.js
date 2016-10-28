"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var codes = require('../Codes/ClientCodes');
var HTTPError_1 = require('./HTTPError');
exports.ClientCodes = codes;
var ClientError = (function (_super) {
    __extends(ClientError, _super);
    // Default-Constuctor
    function ClientError(identifier, exendedMessage, httpCode) {
        if (httpCode === void 0) { httpCode = identifier.httpCode || 400; }
        _super.call(this, identifier.message, httpCode);
        this.exendedMessage = exendedMessage;
        this.code = identifier.code;
    }
    return ClientError;
}(HTTPError_1.HTTPError));
exports.ClientError = ClientError;
//# sourceMappingURL=ClientError.js.map