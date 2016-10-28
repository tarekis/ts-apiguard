export declare class HTTPError extends Error {
    httpCode: number;
    constructor(message: string, httpCode?: number);
    toString(): string;
    getProductionError(): Error;
}
