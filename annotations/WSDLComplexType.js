"use strict";
var XSDComplexType_1 = require("../models/wsdl/XSDComplexType");
function WSDLComplexType(arg) {
    if (typeof arg === 'function') {
        XSDComplexType_1.XSDComplexType.process(arg);
        return;
    }
    else if (typeof arg === 'object') {
        return function (targetClass) { return XSDComplexType_1.XSDComplexType.process(targetClass, arg); };
    }
    throw new Error('Wrong number of parameters');
}
exports.WSDLComplexType = WSDLComplexType;
//# sourceMappingURL=WSDLComplexType.js.map