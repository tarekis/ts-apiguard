export class HTTPError extends Error
{
   // Default-Constuctor
   constructor(
      message: string,
      public httpCode: number = 500 // Fallback to 500
   )
   {
      super(message);
      this.message = message;
      this.stack = (<any>new Error()).stack;
   }
   toString()
   {
      return this.name + ': ' + this.message;
   }

   getProductionError(): Error
   {
      var _this = (<any>Object).assign({}, this);
      delete _this.stack;
      delete _this.httpCode;
      return _this;
   }
}