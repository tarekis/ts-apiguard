import validator = require('validator');

export class Email
{
   public static validateOwnType(ownArgument)
   {
      if (typeof ownArgument === 'string')
      {
         return validator.isEmail(ownArgument);
      }
      return false;
   }

   constructor
   (
      public string: string
   )
   {
   }
}