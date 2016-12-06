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
var XSDChoice_1 = require("./XSDChoice");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var XSDComplexType = (function () {
    function XSDComplexType() {
    }
    XSDComplexType.getXSDComplexType = function (targetClass, createIfNotExists) {
        if (createIfNotExists === void 0) { createIfNotExists = true; }
        return utils_1.getObjectViaReflect('xsd:complexType', targetClass, createIfNotExists ? XSDComplexType : null);
    };
    XSDComplexType.process = function (targetClass, options) {
        if (options === void 0) { options = {}; }
        var complexType = this.getXSDComplexType(targetClass);
        complexType.name = options.name || targetClass.name;
        if (options.suffix)
            complexType.name = complexType.name + options.suffix;
        complexType.nsName = utils_1.addCustomNamespace(complexType.name);
        if (options.choices) {
            for (var choiceName in options.choices) {
                if (options.choices.hasOwnProperty(choiceName)) {
                    complexType.addChoiceOptions(choiceName, options.choices[choiceName]);
                }
            }
        }
    };
    XSDComplexType.prototype.getAllElements = function () {
        var elements = [];
        if (this.choices) {
            this.choices.forEach(function (choice) {
                elements.push.apply(elements, choice.getElements());
            });
        }
        if (this.elements) {
            elements.push.apply(elements, this.elements);
        }
        return elements;
    };
    XSDComplexType.prototype.addElement = function (element) {
        if (!this.elements)
            this.elements = [];
        this.elements.push(element);
    };
    XSDComplexType.prototype.addChoiceElement = function (choiceName, element) {
        if (!this.choices)
            this.choices = [];
        var choice = this.getChoice(choiceName);
        choice.addElement(element);
    };
    /**
     * Returns choice; Creates choice if not exists
     */
    XSDComplexType.prototype.getChoice = function (choiceName) {
        var choice = this.choices.find(function (_choice) { return _choice.name === choiceName; });
        if (!choice) {
            choice = new XSDChoice_1.XSDChoice(choiceName);
            this.choices.push(choice);
        }
        return choice;
    };
    XSDComplexType.prototype.addChoiceOptions = function (choiceName, options) {
        var choice = this.getChoice(choiceName);
        choice.addOptions(options);
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], XSDComplexType.prototype, "name", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            stripPluralS: true,
            namespace: 'xsd',
            implicitStructure: 'xsd:sequence.$'
        }), 
        __metadata('design:type', Array)
    ], XSDComplexType.prototype, "elements", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            stripPluralS: true,
            namespace: 'xsd',
            implicitStructure: 'xsd:sequence.$'
        }), 
        __metadata('design:type', Array)
    ], XSDComplexType.prototype, "choices", void 0);
    return XSDComplexType;
}());
exports.XSDComplexType = XSDComplexType;
//# sourceMappingURL=XSDComplexType.js.map