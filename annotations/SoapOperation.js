"use strict";
var WSDLDefinitions_1 = require("../models/wsdl/WSDLDefinitions");
function SoapOperation(responseDataType) {
    return function (target, key, descriptor) {
        var requestDataType = Reflect.getMetadata('design:paramtypes', target, key)[0];
        if (!requestDataType) {
            throw new Error("The first parameter of '" + key + "' operation need a type annotation for specifying the soap input message type");
        }
        WSDLDefinitions_1.WSDLDefinitions.processOperation(target, key, requestDataType, responseDataType);
    };
}
exports.SoapOperation = SoapOperation;
//# sourceMappingURL=SoapOperation.js.map