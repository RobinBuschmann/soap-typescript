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
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var XSDSchema = (function () {
    function XSDSchema() {
        this.attributeFormDefault = 'unqualified';
        this.wsdl = utils_1.WSDL_URL;
        this.xsd = utils_1.XSD_URL;
        this.elementFormDefault = 'unqualified';
        this.hasElement = {};
        this.hasComplexType = {};
        this.hasSimpleType = {};
    }
    XSDSchema.prototype.setTargetNamespace = function (targetNamespace) {
        this.targetNamespace = targetNamespace;
    };
    XSDSchema.prototype.addElement = function (element) {
        var _this = this;
        if (!this.elements)
            this.elements = [];
        if (!this.hasElement[element.name]) {
            element
                .getAllComplexTypesRecursively()
                .forEach(function (complexType) { return _this.addComplexType(complexType); });
            element
                .getAllSimpleTypesRecursively()
                .forEach(function (simpleType) { return _this.addSimpleType(simpleType); });
            this.elements.push(element);
            this.hasElement[element.name] = true;
        }
    };
    XSDSchema.prototype.addComplexType = function (complexType) {
        if (!this.complexTypes)
            this.complexTypes = [];
        if (!this.hasComplexType[complexType.name]) {
            this.complexTypes.push(complexType);
            this.hasComplexType[complexType.name] = true;
        }
    };
    XSDSchema.prototype.addSimpleType = function (simpleType) {
        if (!this.simpleTypes)
            this.simpleTypes = [];
        if (!this.hasSimpleType[simpleType.name]) {
            this.simpleTypes.push(simpleType);
            this.hasSimpleType[simpleType.name] = true;
        }
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', Object)
    ], XSDSchema.prototype, "attributeFormDefault", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute,
        XMLAttribute_1.XMLAttribute({ namespace: utils_1.XMLNS_NS }), 
        __metadata('design:type', String)
    ], XSDSchema.prototype, "wsdl", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: utils_1.XMLNS_NS }), 
        __metadata('design:type', String)
    ], XSDSchema.prototype, "xsd", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], XSDSchema.prototype, "targetNamespace", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            stripPluralS: true,
            namespace: utils_1.XSD_NS
        }), 
        __metadata('design:type', Array)
    ], XSDSchema.prototype, "elements", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            stripPluralS: true,
            namespace: utils_1.XSD_NS
        }), 
        __metadata('design:type', Array)
    ], XSDSchema.prototype, "complexTypes", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            stripPluralS: true,
            namespace: utils_1.XSD_NS
        }), 
        __metadata('design:type', Array)
    ], XSDSchema.prototype, "simpleTypes", void 0);
    return XSDSchema;
}());
exports.XSDSchema = XSDSchema;
//# sourceMappingURL=XSDSchema.js.map