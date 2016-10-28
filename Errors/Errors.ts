import * as Server       from './Models/ServerError';
import * as Client       from './Models/ClientError';
import * as HTTP         from './Models/HTTPError';

export const ServerError = Server.ServerError;
export const ServerCodes = Server.ServerCodes
export const ClientError = Client.ClientError;
export const ClientCodes = Client.ClientCodes
export const HTTPError   = HTTP.HTTPError;