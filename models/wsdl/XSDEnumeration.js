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
var XSDEnumeration = (function () {
    function XSDEnumeration(value) {
        this.value = value;
    }
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', Object)
    ], XSDEnumeration.prototype, "value", void 0);
    return XSDEnumeration;
}());
exports.XSDEnumeration = XSDEnumeration;
//# sourceMappingURL=XSDEnumeration.js.map