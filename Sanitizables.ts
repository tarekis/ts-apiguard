import 'reflect-metadata';

export function sanitize(target: Sanitizable, key: string)
{
   target.sanitizeObject = target.sanitizeObject || {}; // Pre-class initialize fix .. or so?
   let type = Reflect.getMetadata('design:type', target, key);
   let optional = Reflect.getMetadata('optional', target, key);
   target.sanitizeObject[key + (optional ? '?' : '')] = type;
}

export function optional(target: Sanitizable, key: string)
{
   Reflect.defineMetadata('optional', true, target, key);
}

export class Sanitizable
{
   private static _sanitizeObject: {[key: string]: Function} = {};
   get sanitizeObject(): { [key: string]: Function }
   {
      return Sanitizable._sanitizeObject;
   }
   set sanitizeObject(sanitizeObject: { [key: string]: Function })
   {
      Sanitizable._sanitizeObject = sanitizeObject;
   }
}