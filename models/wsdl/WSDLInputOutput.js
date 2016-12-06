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
var SOAPBody_1 = require("./SOAPBody");
var utils_1 = require("../../utils");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var WSDLInputOutput = (function () {
    function WSDLInputOutput(options) {
        this.message = options.message;
        this.name = options.name;
        if (options.body) {
            this.body = new SOAPBody_1.SOAPBody(options.body);
        }
    }
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLInputOutput.prototype, "name", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLInputOutput.prototype, "message", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: utils_1.SOAP_NS }), 
        __metadata('design:type', SOAPBody_1.SOAPBody)
    ], WSDLInputOutput.prototype, "body", void 0);
    return WSDLInputOutput;
}());
exports.WSDLInputOutput = WSDLInputOutput;
//# sourceMappingURL=WSDLInputOutput.js.map