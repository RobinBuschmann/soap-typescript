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
var XSDEnumeration_1 = require("./XSDEnumeration");
var XSDPattern_1 = require("./XSDPattern");
var utils_1 = require("../../utils");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var XSDRestriction = (function () {
    function XSDRestriction(options) {
        this.options = options;
        this.validateOptions(options);
        if (options.enumeration)
            this.enumeration = options.enumeration.map(function (_enum) { return new XSDEnumeration_1.XSDEnumeration(_enum); });
        if (options.pattern || options.minLength !== void 0 || options.maxLength !== void 0)
            this.pattern = new XSDPattern_1.XSDPattern(options);
        this.base = this.getXSDType(options);
    }
    XSDRestriction.prototype.getXSDType = function (options) {
        if (options.type) {
            return options.type;
        }
        if (options.enumeration && options.enumeration.length) {
            return utils_1.getXSDTypeByValue(options.enumeration[0]);
        }
        if (options.pattern) {
            return utils_1.getXSDTypeByValue('');
        }
        throw new Error("Either base option is not set for XSD restriction or the corresponding type could not been calculated");
    };
    XSDRestriction.prototype.validateOptions = function (options) {
        if (options.enumeration && options.pattern) {
            throw new Error("XSD restriction cannot have both enumeration and pattern. Only one option is allowed.");
        }
        if ((options.enumeration || options.pattern) && (options.minLength !== void 0 || options.maxLength !== void 0)) {
            throw new Error("Restrictions(enumeration, pattern) and Length restrictions(minLength, maxLength) together are not allowed.");
        }
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], XSDRestriction.prototype, "base", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: 'xsd' }), 
        __metadata('design:type', Array)
    ], XSDRestriction.prototype, "enumeration", void 0);
    __decorate([
        XMLChild_1.XMLChild({ namespace: 'xsd' }), 
        __metadata('design:type', XSDPattern_1.XSDPattern)
    ], XSDRestriction.prototype, "pattern", void 0);
    return XSDRestriction;
}());
exports.XSDRestriction = XSDRestriction;
//# sourceMappingURL=XSDRestriction.js.map