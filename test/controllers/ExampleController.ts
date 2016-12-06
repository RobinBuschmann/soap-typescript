import {SoapService} from "../../annotations/SoapService";
import {SoapOperation} from "../../annotations/SoapOperation";
import {ExampleResponseData} from "../models/ExampleResponseData";
import {ExampleRequestData} from "../models/ExampleRequestData";

@SoapService({
  path: '/example',
  portName: 'ExamplePort',
  serviceName: 'ExampleService'
})
export class ExampleController {

  @SoapOperation(ExampleResponseData)
  operationA(data: ExampleRequestData) {

  }
}
