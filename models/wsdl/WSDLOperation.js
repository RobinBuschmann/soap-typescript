"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WSDLInputOutput_1 = require("./WSDLInputOutput");
var utils_1 = require("../../utils");
var SOAPOperation_1 = require("./SOAPOperation");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var WSDLOperation = (function () {
    function WSDLOperation(options) {
        this.name = options.name;
        this.input = new WSDLInputOutput_1.WSDLInputOutput(options.input);
        this.output = new WSDLInputOutput_1.WSDLInputOutput(options.output);
        if (options.soapOperation) {
            this.operation = new SOAPOperation_1.SOAPOperation(options.name);
        }
    }
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLOperation.prototype, "name", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.WSDL_NS }), 
        __metadata('design:type', WSDLInputOutput_1.WSDLInputOutput)
    ], WSDLOperation.prototype, "input", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.WSDL_NS }), 
        __metadata('design:type', WSDLInputOutput_1.WSDLInputOutput)
    ], WSDLOperation.prototype, "output", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.SOAP_NS }), 
        __metadata('design:type', SOAPOperation_1.SOAPOperation)
    ], WSDLOperation.prototype, "operation", void 0);
    return WSDLOperation;
}());
exports.WSDLOperation = WSDLOperation;
//# sourceMappingURL=WSDLOperation.js.map