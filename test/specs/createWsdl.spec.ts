import 'es6-shim';
import {expect} from 'chai';
import {parseString} from 'xml2js';
import {ExampleController} from "../controllers/ExampleController";
import {createWsdl} from "../../index";

describe('createWsdl()', () => {

  it('should not throw', () => {

    expect(() => createWsdl(ExampleController)).not.to.throw;
  });

  it('should be able to create a valid wsdl', done => {

    const exampleWsdl = createWsdl(ExampleController);
    expect(exampleWsdl).to.be.a('string');

    parseString(exampleWsdl, (err, result) => {

      expect(err).to.be.null;
      expect(result).not.to.be.undefined;
      expect(result).to.be.an('object');

      done();
    });

  });

});
