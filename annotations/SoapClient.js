"use strict";
var SOAPClient_1 = require("../models/client/SOAPClient");
function SoapClient(options) {
    return function (target, key) {
        SOAPClient_1.SOAPClient.process(options, target, key);
    };
}
exports.SoapClient = SoapClient;
//# sourceMappingURL=SoapClient.js.map