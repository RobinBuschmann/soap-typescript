import 'es6-shim';
import {expect} from 'chai';
import {parseString} from 'xml2js';
import * as request from 'supertest';
import {OPERATION_A_RESULT, ExampleController, OPERATION_B_RESULT} from "../controllers/ExampleController";
import {SOAP_PATH} from "../apps";
import {ExampleRequestData} from "../models/ExampleRequestData";
import {apps} from "../apps";

const EXAMPLE_REQUEST_DATA: ExampleRequestData = {
  exampleNum: 1,
  examplePattern: 'test',
  exampleString: '34',
  exampleChoice1: 'choice1',
  exampleEnum: 'B'
};
const getXML = (operationName: string) => `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <${operationName}>
      	${Object.keys(EXAMPLE_REQUEST_DATA).map(key => `<${key}>${EXAMPLE_REQUEST_DATA[key]}</${key}>`).join('')}
      </${operationName}>
   </soapenv:Body>
</soapenv:Envelope>`;


apps.forEach(app => {

  describe(app.description, () => {

    describe('ExampleController', () => {

      describe('wsdl', () => {

        const wsdlPath = SOAP_PATH + '?wsdl';

        it('should result in http status ok', () =>

          request(app.value)
            .get(wsdlPath)
            .expect(200)
        );

        it('should have correct address location', () =>

          request(app.value)
            .get(wsdlPath)
            .then(data => {

              return new Promise(resolve => {

                parseString(data.text, (err, result) => {

                  const address = result['wsdl:definitions']['wsdl:service'][0]['wsdl:port'][0]['soap:address'][0]['$']['location'];
                  const protocol = app.options.forceHttpsForAddressLocation ? 'https:' : data['req'].agent.protocol;

                  expect(address).to.equal(protocol + '//' + data['req']._headers.host + SOAP_PATH);
                  resolve();
                });
              });
            })
        );

        it('should result with xml body', () =>

          request(app.value)
            .get(wsdlPath)
            .then(data => {

              expect(data).not.to.be.undefined;
              expect(data.text).to.be.a('string');

              return new Promise(resolve => {

                parseString(data.text, (err, result) => {

                  expect(err).to.be.null;
                  expect(result).to.be.an('object');

                  resolve();
                });
              });
            })
        );

      });

      describe('operationA', () => {

        const OPERATION_NAME = 'operationA';
        const originalOperationA: any = ExampleController.prototype.operationA;

        it('should result in http status ok', () =>
          request(app.value)
            .post(SOAP_PATH)
            .send(getXML(OPERATION_NAME))
            .expect(200)
        );

        it('should pass xml data correctly to controller operation function', () => {

          let data: ExampleRequestData;

          ExampleController.prototype.operationA = (_data: ExampleRequestData, ...args: any[]) => {

            data = _data;
            return originalOperationA(_data, ...args);
          };

          return request(app.value)
            .post(SOAP_PATH)
            .send(getXML(OPERATION_NAME))
            .expect(200)
            .then(() => {

              expect(data).not.to.be.undefined;
              expect(data).not.to.be.an.instanceOf(ExampleRequestData);

              Object
                .keys(EXAMPLE_REQUEST_DATA)
                .forEach(key => {

                  const srcValue = EXAMPLE_REQUEST_DATA[key];
                  const resultValue = data[key];

                  expect(resultValue).to.be.a(typeof srcValue);
                  expect(resultValue).to.equal(srcValue);
                });

              ExampleController.prototype.operationA = originalOperationA;
            });
        });

        it(`should result in "${OPERATION_A_RESULT}"`, () => {


          return request(app.value)
            .post(SOAP_PATH)
            .send(getXML(OPERATION_NAME))
            .expect(200)
            .then((data) =>

              new Promise(resolve =>

                parseString(data.text, (err, result) => {

                  expect(err).to.be.null;
                  expect(result).not.to.be.undefined;
                  expect(result).to.be.an('object');

                  const operationAResult = result['soap:Envelope']['soap:Body'][0]['tns:ExampleResponseData'][0]['result'][0];
                  expect(operationAResult).to.equal(OPERATION_A_RESULT);

                  resolve();
                })
              )
            );
        });

      });

      describe('operationB (promise based)', () => {

        const originalOperationB: any = ExampleController.prototype.operationB;
        const OPERATION_NAME = 'operationB';

        it('should result in http status ok', () =>
          request(app.value)
            .post(SOAP_PATH)
            .send(getXML(OPERATION_NAME))
            .expect(200)
        );

        it('should pass xml data correctly to controller operation function', () => {

          let data: ExampleRequestData;

          ExampleController.prototype.operationB = (_data: ExampleRequestData, ...args: any[]) => {

            data = _data;
            return originalOperationB(_data, ...args);
          };

          return request(app.value)
            .post(SOAP_PATH)
            .send(getXML(OPERATION_NAME))
            .expect(200)
            .then(() => {

              expect(data).not.to.be.undefined;
              expect(data).not.to.be.an.instanceOf(ExampleRequestData);

              Object
                .keys(EXAMPLE_REQUEST_DATA)
                .forEach(key => {

                  const srcValue = EXAMPLE_REQUEST_DATA[key];
                  const resultValue = data[key];

                  expect(resultValue).to.be.a(typeof srcValue);
                  expect(resultValue).to.equal(srcValue);
                });

              ExampleController.prototype.operationB = originalOperationB;
            });
        });

        it(`should result in "${OPERATION_B_RESULT}"`, () => {


          return request(app.value)
            .post(SOAP_PATH)
            .send(getXML(OPERATION_NAME))
            .expect(200)
            .then((data) =>

              new Promise(resolve =>

                parseString(data.text, (err, result) => {

                  expect(err).to.be.null;
                  expect(result).not.to.be.undefined;
                  expect(result).to.be.an('object');

                  const operationBResult = result['soap:Envelope']['soap:Body'][0]['tns:ExampleResponseData'][0]['result'][0];
                  expect(operationBResult).to.equal(OPERATION_B_RESULT);

                  resolve();
                })
              )
            );
        });

      });

    });
  });
});
