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
var _ = require("lodash");
var XSDComplexType_1 = require("./XSDComplexType");
var XSDSimpleType_1 = require("./XSDSimpleType");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XSDElement = (function () {
    function XSDElement(options, complexType) {
        this.options = options;
        this.complexType = complexType;
        this.name = options.name;
        this.nsName = utils_1.addCustomNamespace(options.name);
        this.type = options.type;
        this.minOccurs = options.minOccurs;
        this.maxOccurs = options.maxOccurs;
        if (options.pattern || options.enumeration || options.minLength !== void 0 || options.maxLength !== void 0) {
            this.simpleType = new XSDSimpleType_1.XSDSimpleType(options);
            this.type = this.simpleType.nsName;
        }
    }
    XSDElement.process = function (target, key, options) {
        if (options === void 0) { options = {}; }
        options = _.cloneDeep(options);
        var targetClass = target.constructor;
        var parentComplexType = XSDComplexType_1.XSDComplexType.getXSDComplexType(targetClass);
        var propertyType = Reflect.getMetadata('design:type', target, key);
        options['name'] = key;
        if (propertyType === Array) {
            if (!options.arrayType) {
                throw new Error("In case of arrays you have to define the type of this array in the (options.arrayType).");
            }
            if (options.maxOccurs === void 0) {
                // ensures, that the incoming data
                // will be mapped to an array
                options.maxOccurs = 'unbounded';
            }
            propertyType = options.arrayType;
        }
        var complexType = XSDComplexType_1.XSDComplexType.getXSDComplexType(propertyType, false);
        var element = this.createElement(options, complexType, propertyType);
        if ((options.enumeration || options.pattern) && complexType) {
            throw new Error("Restrictions(enumeration, pattern) are only allowed for simple types (string, int, boolean, ...)");
        }
        if (options.choiceName) {
            parentComplexType.addChoiceElement(options.choiceName, element);
        }
        else {
            parentComplexType.addElement(element);
        }
    };
    XSDElement.createElement = function (options, complexType, propertyType) {
        if (complexType)
            options.type = complexType.nsName;
        options.type = options.type || utils_1.getXSDTypeByDataType(propertyType);
        return new XSDElement(options, complexType);
    };
    XSDElement.prototype.getComplexType = function () {
        return this.complexType;
    };
    XSDElement.prototype.getAllComplexTypesRecursively = function (complexTypes) {
        if (complexTypes === void 0) { complexTypes = []; }
        if (this.complexType) {
            complexTypes.push(this.complexType);
            this.complexType
                .getAllElements()
                .forEach(function (element) { return element.getAllComplexTypesRecursively(complexTypes); });
        }
        return complexTypes;
    };
    XSDElement.prototype.getAllSimpleTypesRecursively = function (simpleTypes) {
        if (simpleTypes === void 0) { simpleTypes = []; }
        if (this.simpleType) {
            simpleTypes.push(this.simpleType);
        }
        if (this.complexType) {
            this.complexType
                .getAllElements()
                .forEach(function (element) { return element.getAllSimpleTypesRecursively(simpleTypes); });
        }
        return simpleTypes;
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], XSDElement.prototype, "name", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], XSDElement.prototype, "type", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', Number)
    ], XSDElement.prototype, "minOccurs", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', Object)
    ], XSDElement.prototype, "maxOccurs", void 0);
    return XSDElement;
}());
exports.XSDElement = XSDElement;
//# sourceMappingURL=XSDElement.js.map