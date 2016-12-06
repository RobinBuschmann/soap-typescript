"use strict";
var XSDElement_1 = require("../models/wsdl/XSDElement");
function WSDLElement() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (args.length === 1) {
        return function (target, key) { return XSDElement_1.XSDElement.process(target, key, args[0]); };
    }
    else if (args.length === 2) {
        XSDElement_1.XSDElement.process(args[0], args[1]);
        return;
    }
    throw new Error('Wrong number of parameters');
}
exports.WSDLElement = WSDLElement;
//# sourceMappingURL=WSDLElement.js.map