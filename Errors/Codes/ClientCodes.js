"use strict";
module.exports = {
    wrongParams: {
        code: 2001,
        message: 'Wrong Parameter entered'
    },
    testUserUsed: {
        code: 2002,
        message: 'Tried to request with test user',
        httpCode: 423
    },
    unauthorized: {
        code: 2003,
        message: 'Unauthorized to perform this request',
        httpCode: 403
    },
    userNotFound: {
        code: 2004,
        message: 'User was not found'
    },
    wrongParameterType: {
        code: 2005,
        message: 'Wrong parameter type'
    }
};
//# sourceMappingURL=ClientCodes.js.map