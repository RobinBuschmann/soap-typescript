import {SoapService, SoapOperation} from "../../index";
import {CalculatorResult} from "../models/CalculatorResult";
import {CalculatorInput} from "../models/CalculatorInput";

@SoapService({
  portName: 'CalculatorPort',
  serviceName: 'CalculatorService'
})
export class CalculatorController {

  @SoapOperation(CalculatorResult)
  add(data: CalculatorInput, req: (res: CalculatorResult) => any): void {

    req({
      value: data.a + data.b
    });
  }

  @SoapOperation(CalculatorResult)
  subtract(data: CalculatorInput, req: (res: CalculatorResult) => any): void {

    req({
      value: data.a - data.b
    });
  }
}
