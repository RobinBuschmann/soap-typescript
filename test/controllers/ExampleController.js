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
var SoapService_1 = require("../../lib/annotations/SoapService");
var SoapOperation_1 = require("../../lib/annotations/SoapOperation");
var ExampleResponseData_1 = require("../models/ExampleResponseData");
var ExampleRequestData_1 = require("../models/ExampleRequestData");
var ExampleController = (function () {
    function ExampleController() {
    }
    ExampleController.prototype.operationA = function (data) {
    };
    return ExampleController;
}());
__decorate([
    SoapOperation_1.SoapOperation(ExampleResponseData_1.ExampleResponseData),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExampleRequestData_1.ExampleRequestData]),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "operationA", null);
ExampleController = __decorate([
    SoapService_1.SoapService({
        path: '/example',
        portName: 'ExamplePort',
        serviceName: 'ExampleService',
        targetNamespace: 'http://example.controller.com'
    })
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=ExampleController.js.map