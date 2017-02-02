import {SoapService} from "../../lib/annotations/SoapService";
import {SoapOperation} from "../../lib/annotations/SoapOperation";
import {ExampleResponseData} from "../models/ExampleResponseData";
import {ExampleRequestData} from "../models/ExampleRequestData";

@SoapService({
  path: '/example',
  portName: 'ExamplePort',
  serviceName: 'ExampleService',
  targetNamespace: 'http://example.controller.com'
})
export class ExampleController {

  @SoapOperation(ExampleResponseData)
  operationA(data: ExampleRequestData): void {

  }
}
