import 'es6-shim';
import {expect} from 'chai';
import {parseString} from 'xml2js';
import * as request from 'supertest';
import {OPERATION_A_RESULT, ExampleController} from "../controllers/ExampleController";
import {SOAP_PATH} from "../apps";
import {ExampleRequestData} from "../models/ExampleRequestData";
import {ExampleResponseData} from "../models/ExampleResponseData";
import {apps} from "../apps";

const EXAMPLE_REQUEST_DATA: ExampleRequestData = {
  exampleNum: 1,
  examplePattern: 'test',
  exampleString: '34',
  exampleChoice1: 'choice1',
  exampleEnum: 'B'
};
const XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <operationA>
      	${Object.keys(EXAMPLE_REQUEST_DATA).map(key => `<${key}>${EXAMPLE_REQUEST_DATA[key]}</${key}>`).join('')}
      </operationA>
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

        const originalOperationA = ExampleController.prototype.operationA;

        it('should result in http status ok', () =>
          request(app.value)
            .post(SOAP_PATH)
            .send(XML)
            .expect(200)
        );

        it('should pass xml data correctly to controller operation function', () => {

          let data: ExampleRequestData;

          ExampleController.prototype.operationA = (_data: ExampleRequestData, req: (res: ExampleResponseData) => any) => {

            data = _data;
            originalOperationA(_data, req);
          };

          return request(app.value)
            .post(SOAP_PATH)
            .send(XML)
            .expect(200)
            .then(() => {

              expect(data).not.to.be.undefined;

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
            .send(XML)
            .expect(200)
            .then((data) =>

              new Promise(resolve =>

                parseString(data.text, (err, result) => {

                  expect(err).to.be.null;
                  expect(result).not.to.be.undefined;
                  expect(result).to.be.an('object');

                  const operationAResult = result['soap:Envelope']['soap:Body'][0]['ExampleResponseData'][0]['result'][0];
                  expect(operationAResult).to.equal(OPERATION_A_RESULT);

                  resolve();
                })
              )
            );
        });

      });

    });
  });
});
