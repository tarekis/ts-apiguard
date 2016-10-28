import { HTTPError } from './HTTPError';
export declare const ServerCodes: {
    functionParametersInvalid: {
        code: number;
        message: string;
    };
    uncaughtError: {
        code: number;
        message: string;
    };
    databaseError: {
        code: number;
        message: string;
    };
    sanitizationTypeError: {
        code: number;
        message: string;
    };
};
export declare class ServerError extends HTTPError {
    exendedMessage: string;
    code: number;
    constructor(identifier: {
        code: number;
        message: string;
        httpCode?: number;
    }, exendedMessage?: string, httpCode?: number);
    getProductionError(): Error;
}
