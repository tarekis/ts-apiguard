// External
import 'validator';
import Q = require("q");

// Internal
import { Sanitizable }              from './Sanitizables'

export default function (object: Object, ruleClass: Sanitizable, rejectOnAdditionalProperty?: boolean): Q.Promise<{} | { [key: string]: boolean }>
{
   if (ruleClass && ruleClass.__typeRules__)
   {
      let expectedPropertyMap = ruleClass.__typeRules__;
      let objectMirror = (<any>Object).assign({}, object);

      if (object)
      {
         let propertyNames = Object.keys(expectedPropertyMap);
         let propertyNamesLength = propertyNames.length;
         let optionalPropertyMap: { [key: string]: boolean } = {};

         for (let i = 0; i < propertyNamesLength; i++)
         {
            let propertyName = propertyNames[i];
            let propertyNormalizedType = expectedPropertyMap[propertyName];
            let propertyValue;

            // Optional Rule
            if (propertyName.slice(-1) === '?')
            {
               propertyName = propertyName.substr(0, propertyName.length - 1);
               propertyValue = object[propertyName];
               if (propertyValue === undefined || propertyValue === '')
               {
                  // Add status to parameter status object
                  optionalPropertyMap[propertyName] = false;
                  if (propertyValue === '')
                  {
                     // Remove rule from mirror if empty
                     delete objectMirror[propertyName];
                  }
                  // Skip rule checking if it's object value is undefined
                  continue;
               }
               else
               {
                  optionalPropertyMap[propertyName] = true;
               }
            }
            else
            {
               propertyValue = object[propertyName];
            }

            if (propertyValue !== undefined && propertyValue !== '')
            {
               // Check for a self-validating type
               if (propertyNormalizedType['validateOwnType'] && typeof propertyNormalizedType['validateOwnType'] === 'function')
               {
                  let isValid = propertyNormalizedType['validateOwnType'](propertyValue);
                  if (!isValid)
                  {
                     return Q.reject(new TypeError('Type "' + propertyNormalizedType['name'] + '" could not validate itself with value "' + propertyValue + '"'));
                  }
                  if (propertyNormalizedType['transformOwnType'] && typeof propertyNormalizedType['transformOwnType'] === 'function')
                  {
                     propertyValue = propertyNormalizedType['transformOwnType'].transformOwnType(propertyValue);
                  }
               }
               else
               {
                  // Fallback to native types
                  switch (propertyNormalizedType)
                  {
                     case String:
                        if (typeof propertyValue !== 'string')
                        {
                           return Q.reject(new TypeError(genericTypeErrorText(propertyName, propertyValue, 'string')));
                        }
                        break;
                     case Number:
                        if (typeof propertyValue !== 'number')
                        {
                           return Q.reject(new TypeError(genericTypeErrorText(propertyName, propertyValue, 'number')));
                        }
                        break;
                     case Boolean:
                        if (typeof propertyValue !== 'boolean')
                        {
                           return Q.reject(new TypeError(genericTypeErrorText(propertyName, propertyValue, 'boolean')));
                        }
                        break;
                     case Date:
                        if (typeof propertyValue !== 'string')
                        {
                           return Q.reject(new TypeError(genericTypeErrorText(propertyName, propertyValue, 'string that matches a date')));
                        }
                        else if (!validator.isDate(propertyValue))
                        {
                           return Q.reject(new TypeError(genericTypeErrorText(propertyName, propertyValue, 'string that matches a date')));
                        }
                        object[propertyName] = new Date(propertyValue);
                        break;

                     case Array:
                        if (!Array.isArray(propertyValue))
                        {
                           return Q.reject(new TypeError(genericTypeErrorText(propertyName, propertyValue, 'array')));
                        }
                        break;
                     default:
                        return Q.reject(new Error('Tried to validate "' + propertyName + '" for unchecked type "' + propertyNormalizedType + '"'));
                  }
               }
               // Remove from mirror
               delete objectMirror[propertyName];
            }
            else
            {
               return Q.reject(new TypeError('Expected object property "' + propertyName + '" to exist.'));
            }
         }
         if (rejectOnAdditionalProperty || true)
         {
            let remainingKeys = Object.keys(objectMirror);
            if (remainingKeys.length > 0)
            {
               let errorMessage = 'Passed prohibited additional propert';
               if (remainingKeys.length > 1)
               {
                  let lastKey = remainingKeys.pop();
                  errorMessage += 'ies "' + remainingKeys.join(',') + ' and ' + lastKey + '"';
               }
               else
               {
                  errorMessage += 'y "' + remainingKeys[0] + '"';
               }
               return Q.reject(new Error(errorMessage));
            }
         }
         return Q.resolve(optionalPropertyMap);
      }
      else
      {
         return Q.reject(new TypeError('Request to sanitize does not exist'));
      }
   }
   else
   {
      return Q.reject(new Error('Sanitization rules do not exist.'));
   }
}

function genericTypeErrorText(propertyName, propertyValue, propertyType)
{
   return 'Expected object parameter "' + propertyName + '" to be a ' + propertyType + ', instead got "' + propertyValue + '".';
}