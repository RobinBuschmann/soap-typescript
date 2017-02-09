import {SoapService, SoapOperation} from "../../index";
import {ExampleResponseData} from "../models/ExampleResponseData";
import {ExampleRequestData} from "../models/ExampleRequestData";

export const SERVICE_NAME = 'ExampleService';
export const PORT_NAME = 'ExampleService';
export const TARGET_NAMESPACE = 'http://example.controller.com';
export const OPERATION_A_RESULT = 'hello-world';

@SoapService({
  portName: PORT_NAME,
  serviceName: SERVICE_NAME,
  targetNamespace: TARGET_NAMESPACE
})
export class ExampleController {

  @SoapOperation(ExampleResponseData)
  operationA(data: ExampleRequestData, res: (res: ExampleResponseData) => any): void {

    res({
      result: OPERATION_A_RESULT
    });
  }
}
