"use strict";
require('es6-shim');
var chai_1 = require('chai');
var WSDLDefinitions_1 = require("../../models/wsdl/WSDLDefinitions");
var XMLElement_1 = require("xml-typescript/models/XMLElement");
var ExampleController_1 = require("../controllers/ExampleController");
describe('ExampleController', function () {
    it('should be able to create a wsdl without errors', function () {
        var wsdlDefinition = WSDLDefinitions_1.WSDLDefinitions.getWSDLDefinitions(ExampleController_1.ExampleController, false);
        var xml = XMLElement_1.XMLElement.serialize('wsdl:definitions', wsdlDefinition);
        chai_1.expect(xml).not.to.be.undefined;
        chai_1.expect(typeof xml).to.equal('string');
    });
});
//# sourceMappingURL=ExampleController.spec.js.map