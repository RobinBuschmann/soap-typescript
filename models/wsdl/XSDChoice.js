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
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var XSDChoice = (function () {
    function XSDChoice(name) {
        this.name = name;
    }
    XSDChoice.prototype.getElements = function () {
        return this.elements || [];
    };
    XSDChoice.prototype.addElement = function (element) {
        if (!this.elements)
            this.elements = [];
        this.elements.push(element);
    };
    XSDChoice.prototype.addOptions = function (options) {
        this.minOccurs = options.minOccurs;
        this.maxOccurs = options.maxOccurs;
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', Number)
    ], XSDChoice.prototype, "minOccurs", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', Number)
    ], XSDChoice.prototype, "maxOccurs", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            stripPluralS: true,
            namespace: 'xsd'
        }), 
        __metadata('design:type', Array)
    ], XSDChoice.prototype, "elements", void 0);
    return XSDChoice;
}());
exports.XSDChoice = XSDChoice;
//# sourceMappingURL=XSDChoice.js.map