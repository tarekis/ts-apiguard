"use strict";
var Server = require('./Models/ServerError');
var Client = require('./Models/ClientError');
var HTTP = require('./Models/HTTPError');
exports.ServerError = Server.ServerError;
exports.ServerCodes = Server.ServerCodes;
exports.ClientError = Client.ClientError;
exports.ClientCodes = Client.ClientCodes;
exports.HTTPError = HTTP.HTTPError;
//# sourceMappingURL=Errors.js.map