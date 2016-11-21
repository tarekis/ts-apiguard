import 'reflect-metadata';

function sanitize(target, key: string)
{
   // Read
   let type = Reflect.getMetadata('design:type', target, key);
   let optional = Reflect.getMetadata('optional', target, key);
   let constructor = target.constructor;
   let parent = Object.getPrototypeOf(constructor.prototype).constructor || {};

   // Initialize
   if (!constructor['__ts-apiguard:typeRules__'])
   {
      Object.defineProperty(constructor, '__ts-apiguard:typeRules__', {
         value: (<any>Object).assign({}, (parent['__ts-apiguard:typeRules__'] || {})),
         writable: true,
         enumerable: false
      });
   }

   // Write
   let o = {};
   o[key + (optional ? '?' : '')] = type;
   Object.defineProperty(constructor, '__ts-apiguard:typeRules__', {
      value: (<any>Object).assign(constructor['__ts-apiguard:typeRules__'], o)
   });
}

function optional(target: Sanitizable, key: string)
{
   Reflect.defineMetadata('optional', true, target, key);
}

interface Sanitizable
{
   '__ts-apiguard:typeRules__'?: {[key: string] : Function}
}

export { Sanitizable }
export { optional }
export { sanitize }
