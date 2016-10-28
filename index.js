"use strict";
var ClientError_1 = require('../Errors/Models/ClientError');
var ServerError_1 = require('../Errors/Models/ServerError');
var validator = require('validator');
var Q = require("q");
module.exports = function (object, ruleClass) {
    var rules = ruleClass.sanitizeObject;
    var objectMirror = Object.assign({}, object);
    if (object) {
        var ruleNames = Object.keys(rules);
        var len = ruleNames.length;
        var optionalParametersStatus = {};
        for (var i = 0; i < len; i++) {
            var ruleName = ruleNames[i];
            var ruleValue = rules[ruleName];
            var objectValue = void 0;
            // Optional Rule
            if (ruleName.slice(-1) === "?") {
                ruleName = ruleName.substr(0, ruleName.length - 1);
                objectValue = object[ruleName];
                if (objectValue === undefined || objectValue === '') {
                    // Add status to parameter status object
                    optionalParametersStatus[ruleName] = false;
                    if (objectValue === '') {
                        // Remove rule from mirror if empty
                        delete objectMirror[ruleName];
                    }
                    // Skip rule checking if it's object value is undefined
                    continue;
                }
                else {
                    optionalParametersStatus[ruleName] = true;
                }
            }
            else {
                objectValue = object[ruleName];
            }
            if (objectValue !== undefined && objectValue !== '') {
                // Check for a self-validating type
                if (ruleValue.validateOwnType && typeof ruleValue.validateOwnType === 'function') {
                    var isValid = ruleValue.validateOwnType(objectValue);
                    if (!isValid) {
                        return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParams, 'Type "' + ruleName + '" could not validate itself with value "' + objectValue + '"'));
                    }
                }
                else {
                    // Fallback to default types
                    switch (ruleValue) {
                        case String:
                            if (typeof objectValue !== 'string') {
                                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParams, 'Expected object parameter "' + ruleName + '" to be a String. Got "' + typeof objectValue + '"'));
                            }
                            break;
                        case Number:
                            if (typeof objectValue !== 'number') {
                                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParameterType, 'Expected object parameter "' + ruleName + '" to be a number or a string that matches a number.'));
                            }
                            break;
                        case Boolean:
                            if (typeof objectValue !== 'string') {
                                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParameterType, 'Expected object parameter "' + ruleName + '" to be a string.'));
                            }
                            if (!validator.isBoolean(objectValue)) {
                                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParams, 'Expected object parameter "' + ruleName + '" to be a string that matches a boolean, instead got "' + objectValue + '".'));
                            }
                            break;
                        case Date:
                            if (typeof objectValue !== 'string') {
                                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParameterType, 'Expected object parameter "' + ruleName + '" to be a string.'));
                            }
                            if (!validator.isDate(objectValue)) {
                                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParams, 'Expected object parameter "' + ruleName + '" to be a string that matches a date, instead got "' + objectValue + '".'));
                            }
                            break;
                        default:
                            return Q.reject(new ServerError_1.ServerError(ServerError_1.ServerCodes.sanitizationTypeError, 'Tried to sanitize "' + ruleName + '" for unchecked type "' + ruleValue + '"'));
                    }
                }
                // Remove from mirror
                delete objectMirror[ruleName];
            }
            else {
                return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParams, 'Expected object parameter "' + ruleName + '" to exist.'));
            }
        }
        var remainingKeys = Object.keys(objectMirror);
        if (remainingKeys.length > 0) {
            return Q.reject(new ClientError_1.ClientError(ClientError_1.ClientCodes.wrongParameterType, 'Passed prohibited additional parameter' + (remainingKeys.length > 1 ? 's' : '') + ' "' + remainingKeys.join(' ') + '"'));
        }
        return Q.resolve(optionalParametersStatus);
    }
    else {
        return Q.reject(new ServerError_1.ServerError(ServerError_1.ServerCodes.functionParametersInvalid, 'Object to sanitize does not exist'));
    }
};
//# sourceMappingURL=objectSanitizer.js.map