"use strict";
require("es6-shim");
var chai_1 = require("chai");
var parser = require("xml2json");
var ExampleController_1 = require("../controllers/ExampleController");
var index_1 = require("../../index");
var WSDLDefinitions_1 = require("../../lib/models/wsdl/WSDLDefinitions");
describe('getWSDLDefinitions()', function () {
    it('should create a valid schema with expected values', function () {
        var schema = WSDLDefinitions_1.WSDLDefinitions.getWSDLDefinitions(ExampleController_1.ExampleController.prototype);
        chai_1.expect(schema['schema']['elements']).to.have.property('length', 2);
        chai_1.expect(function () { return index_1.createWsdl(ExampleController_1.ExampleController); }).not.to.throw;
    });
});
describe('createWsdl()', function () {
    it('should not throw', function () {
        chai_1.expect(function () { return index_1.createWsdl(ExampleController_1.ExampleController); }).not.to.throw;
    });
    it('should be able to create a valid wsdl', function () {
        var result = index_1.createWsdl(ExampleController_1.ExampleController);
        chai_1.expect(function () { return parser.toJson(result); }).not.to.throw;
        chai_1.expect(typeof result).to.equal('string');
    });
});
//# sourceMappingURL=ExampleController.spec.js.map