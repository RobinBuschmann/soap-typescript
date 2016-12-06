import 'es6-shim';
import {expect} from 'chai';
import {WSDLDefinitions} from "../../models/wsdl/WSDLDefinitions";
import {XMLElement} from "xml-typescript/models/XMLElement";
import {ExampleController} from "../controllers/ExampleController";


describe('ExampleController', () => {

  it('should be able to create a wsdl without errors', () => {

    const wsdlDefinition = WSDLDefinitions.getWSDLDefinitions(ExampleController, false);
    const xml = XMLElement.serialize('wsdl:definitions', wsdlDefinition);

    expect(xml).not.to.be.undefined;
    expect(typeof xml).to.equal('string');
  })

});

