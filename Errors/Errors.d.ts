import * as Server from './Models/ServerError';
import * as Client from './Models/ClientError';
import * as HTTP from './Models/HTTPError';
export declare const ServerError: typeof Server.ServerError;
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
export declare const ClientError: typeof Client.ClientError;
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
export declare const HTTPError: typeof HTTP.HTTPError;
