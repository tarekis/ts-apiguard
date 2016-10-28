import codes = require('../Codes/ClientCodes');
import { HTTPError } from './HTTPError';

export const ClientCodes = codes;

export class ClientError extends HTTPError
{
   public code: number;
   // Default-Constuctor
   constructor(
      identifier: { code: number, message: string, httpCode?: number },
      public exendedMessage?: string,
      httpCode: number = identifier.httpCode || 400
   )
   {
      super(identifier.message, httpCode);
      this.code = identifier.code;
   }
}