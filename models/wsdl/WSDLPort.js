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
var SOAPAddress_1 = require("./SOAPAddress");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var WSDLPort = (function () {
    function WSDLPort(options) {
        this.name = options.name;
        this.binding = options.binding;
        this.address = new SOAPAddress_1.SOAPAddress(options.address);
    }
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLPort.prototype, "name", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLPort.prototype, "binding", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: 'soap' }), 
        __metadata('design:type', SOAPAddress_1.SOAPAddress)
    ], WSDLPort.prototype, "address", void 0);
    return WSDLPort;
}());
exports.WSDLPort = WSDLPort;
//# sourceMappingURL=WSDLPort.js.map