import 'es6-shim';
import {expect} from 'chai';
import {ExampleController} from "../controllers/ExampleController";
import {SERVICE_NAME} from "../controllers/ExampleController";
import {PORT_NAME} from "../controllers/ExampleController";
import {TARGET_NAMESPACE} from "../controllers/ExampleController";
import {MESSAGE_SUFFIX} from "../../lib/utils";
import {addCustomNamespace} from "../../lib/utils";
import {PORT_TYPE_SUFFIX} from "../../lib/utils";
import {BINDING_SUFFIX} from "../../lib/utils";
import {getWsdlDefinitions} from "../../index";


describe('getWsdlDefinitions()', () => {

  const operationKeys = Object.keys(ExampleController.prototype).filter(key => key !== 'constructor');
  const expectedOperationCount = operationKeys.length;

  it('should not throw', () => {

    expect(() => getWsdlDefinitions(ExampleController)).not.to.throw;
  });

  const wsdlDefinitions = getWsdlDefinitions(ExampleController);

  it('should have attributes', () => {

    expect(wsdlDefinitions).to.have.property('targetNamespace', TARGET_NAMESPACE);
    expect(wsdlDefinitions).to.have.property('tns', TARGET_NAMESPACE);
  });

  it('should have correct service and port', () => {

    expect(wsdlDefinitions['service']).to.have.property('name', SERVICE_NAME);
    expect(wsdlDefinitions['service']['port']).to.have.property('name', PORT_NAME);
  });

  it('should have correct binding, binding operations and input/output', () => {

    expect(wsdlDefinitions).to.have.property('binding');
    expect(wsdlDefinitions['binding']).to.have.property('name', SERVICE_NAME + BINDING_SUFFIX);
    expect(wsdlDefinitions['binding']).to.have.property('operations');
    expect(wsdlDefinitions['binding']['operations']).to.have.property('length', expectedOperationCount);

    operationKeys.forEach(operationKey => {

      const operationName = operationKey;
      const operation = wsdlDefinitions['binding']['operations']
        .find(_operation => _operation.name === operationName);

      expect(operation).not.to.be.undefined;

      if (operation) {

        expect(operation).to.have.property('input');
        expect(operation['input']).to.have.property('body');
        expect(operation['input']['body']).to.have.property('parts', operationKey);

        expect(operation).to.have.property('output');
        expect(operation['output']).to.have.property('body');
        expect(operation['output']['body']).to.have.property('parts');
      }
    });
  });

  it('should have correct port type, port type operations and input/output', () => {

    expect(wsdlDefinitions['portType']).to.have.property('name', SERVICE_NAME + PORT_TYPE_SUFFIX);
    expect(wsdlDefinitions['portType']).to.have.property('operations');
    expect(wsdlDefinitions['portType']['operations']).to.have.property('length', expectedOperationCount);

    operationKeys.forEach(operationKey => {

      const operationName = operationKey;
      const operation = wsdlDefinitions['portType']['operations']
        .find(_operation => _operation.name === operationName);

      expect(operation).not.to.be.undefined;

      if (operation) {

        expect(operation).to.have.property('input');
        expect(operation['input']).to.have.property('message');

        expect(operation).to.have.property('output');
        expect(operation['output']).to.have.property('message');
      }
    });
  });

  it('should have correct messages', () => {

    const expectedMessageCount = operationKeys.length * 2;
    expect(wsdlDefinitions['messages']).to.have.property('length', expectedMessageCount);

    operationKeys.forEach(operationKey => {

      const messageName = operationKey + MESSAGE_SUFFIX;
      const message = wsdlDefinitions['messages']
        .find(_message => _message.name === messageName);

      expect(message).not.to.be.undefined;
      expect(message).to.have.property('nsName', addCustomNamespace(messageName));
    });

  });

});
