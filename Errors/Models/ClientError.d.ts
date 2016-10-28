import { HTTPError } from './HTTPError';
export declare const ClientCodes: {
    wrongParams: {
        code: number;
        message: string;
    };
    testUserUsed: {
        code: number;
        message: string;
        httpCode: number;
    };
    unauthorized: {
        code: number;
        message: string;
        httpCode: number;
    };
    userNotFound: {
        code: number;
        message: string;
    };
    wrongParameterType: {
        code: number;
        message: string;
    };
};
export declare class ClientError extends HTTPError {
    exendedMessage: string;
    code: number;
    constructor(identifier: {
        code: number;
        message: string;
        httpCode?: number;
    }, exendedMessage?: string, httpCode?: number);
}
