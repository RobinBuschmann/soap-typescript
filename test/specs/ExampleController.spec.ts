import 'es6-shim';
import {expect} from 'chai';
import * as parser from 'xml2json';
import {ExampleController} from "../controllers/ExampleController";
import {createWsdl} from "../../index";
import {WSDLDefinitions} from "../../lib/models/wsdl/WSDLDefinitions";


describe('getWSDLDefinitions()', () => {

  it('should create a valid schema with expected values', () => {

    const schema = WSDLDefinitions.getWSDLDefinitions(ExampleController.prototype);

    expect(schema['schema']['elements']).to.have.property('length', 2);

    expect(() => createWsdl(ExampleController)).not.to.throw;
  });

});

describe('createWsdl()', () => {

  it('should not throw', () => {

    expect(() => createWsdl(ExampleController)).not.to.throw;
  });

  it('should be able to create a valid wsdl', () => {

    const result = createWsdl(ExampleController);

    expect(() => parser.toJson(result)).not.to.throw;
    expect(typeof result).to.equal('string');
  });

});
