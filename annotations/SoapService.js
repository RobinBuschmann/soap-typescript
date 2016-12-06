"use strict";
var WSDLDefinitions_1 = require("../models/wsdl/WSDLDefinitions");
function SoapService(options) {
    return function (targetClassFunc) {
        WSDLDefinitions_1.WSDLDefinitions.processService(targetClassFunc, options);
    };
}
exports.SoapService = SoapService;
//# sourceMappingURL=SoapService.js.map