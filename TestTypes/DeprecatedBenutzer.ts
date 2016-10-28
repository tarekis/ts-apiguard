import { sanitize, optional, Sanitizable } from './Sanitizables'
import { Email } from './Email'

export class DeprecatedBenutzer extends Sanitizable
{
   @sanitize
   public mail: Email;
   @sanitize
   public prop: string;

   constructor(
      mail: Email,
      prop: string,
   )
   {
      super();
      this.mail = mail;
      this.prop = prop;
   }
}