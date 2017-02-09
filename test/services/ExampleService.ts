import {SoapClient} from "../../index";

export interface IExampleSoapClient {

  operationA: () => Promise<any>;
}

export class ExampleService {

  @SoapClient({
    operations: ['operationA'],
    wsdlPath: ''
  })
  exampleSoapClient: IExampleSoapClient;

}
