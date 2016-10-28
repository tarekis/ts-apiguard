import Q = require("q");
import { Sanitizable } from '../../public/DataModels/Sanitizables';
declare var _default: (object: Object, ruleClass: Sanitizable) => Q.Promise<{} | {
    [key: string]: boolean;
}>;
export = _default;
