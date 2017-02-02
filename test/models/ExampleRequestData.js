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
var XSDComplexType_1 = require("../../lib/annotations/XSDComplexType");
var XSDElement_1 = require("../../lib/annotations/XSDElement");
var ExampleRequestChildData_1 = require("./ExampleRequestChildData");
var ExampleRequestChildData2_1 = require("./ExampleRequestChildData2");
var ExampleRequestData = ExampleRequestData_1 = (function () {
    function ExampleRequestData() {
    }
    return ExampleRequestData;
}());
ExampleRequestData.Choice = 'ExampleChoice';
__decorate([
    XSDElement_1.XSDElement({
        enumeration: ['A', 'B', 'C'],
        minOccurs: 1,
        maxOccurs: 1
    }),
    __metadata("design:type", String)
], ExampleRequestData.prototype, "exampleEnum", void 0);
__decorate([
    XSDElement_1.XSDElement,
    __metadata("design:type", Number)
], ExampleRequestData.prototype, "exampleNum", void 0);
__decorate([
    XSDElement_1.XSDElement({
        minLength: 1,
        maxLength: 5
    }),
    __metadata("design:type", String)
], ExampleRequestData.prototype, "exampleString", void 0);
__decorate([
    XSDElement_1.XSDElement({
        pattern: /test/
    }),
    __metadata("design:type", String)
], ExampleRequestData.prototype, "examplePattern", void 0);
__decorate([
    XSDElement_1.XSDElement({
        choiceName: ExampleRequestData_1.Choice
    }),
    __metadata("design:type", String)
], ExampleRequestData.prototype, "exampleChoice1", void 0);
__decorate([
    XSDElement_1.XSDElement({
        choiceName: ExampleRequestData_1.Choice
    }),
    __metadata("design:type", String)
], ExampleRequestData.prototype, "exampleChoice2", void 0);
__decorate([
    XSDElement_1.XSDElement,
    __metadata("design:type", ExampleRequestChildData_1.ExampleRequestChildData)
], ExampleRequestData.prototype, "exampleChild", void 0);
__decorate([
    XSDElement_1.XSDElement({
        arrayType: ExampleRequestChildData2_1.ExampleRequestChildData2
    }),
    __metadata("design:type", Array)
], ExampleRequestData.prototype, "exampleChild2", void 0);
ExampleRequestData = ExampleRequestData_1 = __decorate([
    XSDComplexType_1.XSDComplexType
], ExampleRequestData);
exports.ExampleRequestData = ExampleRequestData;
var ExampleRequestData_1;
//# sourceMappingURL=ExampleRequestData.js.map