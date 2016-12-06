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
var WSDLComplexType_1 = require("../../annotations/WSDLComplexType");
var WSDLElement_1 = require("../../annotations/WSDLElement");
var ExampleRequestData = (function () {
    function ExampleRequestData() {
    }
    ExampleRequestData.Choice = 'ExampleChoice';
    __decorate([
        WSDLElement_1.WSDLElement({
            enumeration: ['A', 'B', 'C'],
            minOccurs: 1,
            maxOccurs: 1,
        }), 
        __metadata('design:type', String)
    ], ExampleRequestData.prototype, "exampleEnum", void 0);
    __decorate([
        WSDLElement_1.WSDLElement({
            choiceName: ExampleRequestData.Choice
        }), 
        __metadata('design:type', String)
    ], ExampleRequestData.prototype, "exampleChoice1", void 0);
    __decorate([
        WSDLElement_1.WSDLElement({
            choiceName: ExampleRequestData.Choice
        }), 
        __metadata('design:type', String)
    ], ExampleRequestData.prototype, "exampleChoice2", void 0);
    ExampleRequestData = __decorate([
        WSDLComplexType_1.WSDLComplexType, 
        __metadata('design:paramtypes', [])
    ], ExampleRequestData);
    return ExampleRequestData;
}());
exports.ExampleRequestData = ExampleRequestData;
//# sourceMappingURL=ExampleRequestData.js.map