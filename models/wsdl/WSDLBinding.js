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
var SOAPBinding_1 = require("./SOAPBinding");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var WSDLBinding = (function () {
    function WSDLBinding() {
        this.operations = [];
        this.binding = new SOAPBinding_1.SOAPBinding();
    }
    WSDLBinding.prototype.setName = function (name) {
        this.name = name;
        this.nsName = utils_1.addCustomNamespace(name);
    };
    WSDLBinding.prototype.setType = function (type) {
        this.type = type;
    };
    WSDLBinding.prototype.addOperation = function (operation) {
        this.operations.push(operation);
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLBinding.prototype, "name", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            namespace: utils_1.SOAP_NS
        }), 
        __metadata('design:type', SOAPBinding_1.SOAPBinding)
    ], WSDLBinding.prototype, "binding", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            name: 'operation',
            namespace: utils_1.WSDL_NS
        }), 
        __metadata('design:type', Array)
    ], WSDLBinding.prototype, "operations", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], WSDLBinding.prototype, "type", void 0);
    return WSDLBinding;
}());
exports.WSDLBinding = WSDLBinding;
//# sourceMappingURL=WSDLBinding.js.map