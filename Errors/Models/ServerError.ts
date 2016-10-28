import codes = require('../Codes/ServerCodes');
import { HTTPError } from './HTTPError';

export const ServerCodes = codes;

export class ServerError extends HTTPError
{
   public code: number;
   // Default-Constuctor
   constructor(
      identifier: { code: number, message: string, httpCode?: number },
      public exendedMessage?: string,
      httpCode: number = identifier.httpCode || 500
   )
   {
      super(identifier.message, httpCode);
      this.code = identifier.code;
   }

   getProductionError(): Error
   {
      var _this = (<any>Object).assign({}, super.getProductionError());
      // Remove all direct messages for production errors
      delete _this.message;
      delete _this.exendedMessage;
      return _this;
   }
}