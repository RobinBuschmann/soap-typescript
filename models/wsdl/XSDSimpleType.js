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
var XSDRestriction_1 = require("./XSDRestriction");
var utils_1 = require("../../utils");
var XMLAttribute_1 = require("xml-typescript/annotations/XMLAttribute");
var XMLChild_1 = require("xml-typescript/annotations/XMLChild");
var XSDSimpleType = (function () {
    function XSDSimpleType(options) {
        this.name = this.determineName(options);
        this.nsName = utils_1.addCustomNamespace(this.name);
        this.restriction = new XSDRestriction_1.XSDRestriction(options);
    }
    XSDSimpleType.prototype.determineName = function (options) {
        if (options.minLength !== void 0 || options.maxLength !== void 0) {
            return ("Length" + (options.minLength || 0) + (options.maxLength ? '-' + options.maxLength : '')) + utils_1.TYPE_SUFFIX;
        }
        return options.name + utils_1.TYPE_SUFFIX;
    };
    __decorate([
        XMLAttribute_1.XMLAttribute, 
        __metadata('design:type', String)
    ], XSDSimpleType.prototype, "name", void 0);
    __decorate([
        XMLChild_1.XMLChild({
            namespace: utils_1.XSD_NS,
        }), 
        __metadata('design:type', XSDRestriction_1.XSDRestriction)
    ], XSDSimpleType.prototype, "restriction", void 0);
    return XSDSimpleType;
}());
exports.XSDSimpleType = XSDSimpleType;
//# sourceMappingURL=XSDSimpleType.js.map