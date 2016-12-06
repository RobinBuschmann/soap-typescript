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
var utils_1 = require("../../utils");
var WSDLPart_1 = require("./WSDLPart");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var WSDLMessage = (function () {
    function WSDLMessage(options) {
        this.name = options.name;
        this.nsName = utils_1.addCustomNamespace(options.name);
        this.part = new WSDLPart_1.WSDLPart(options.part);
    }
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLMessage.prototype, "name", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: 'wsdl' }), 
        __metadata('design:type', WSDLPart_1.WSDLPart)
    ], WSDLMessage.prototype, "part", void 0);
    return WSDLMessage;
}());
exports.WSDLMessage = WSDLMessage;
//# sourceMappingURL=WSDLMessage.js.map