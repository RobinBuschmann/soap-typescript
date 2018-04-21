import {SoapService, SoapOperation} from "../../index";
import {CalculatorResult} from "../models/CalculatorResult";
import {CalculatorInput} from "../models/CalculatorInput";

@SoapService({
  portName: 'CalculatorPort',
  serviceName: 'CalculatorService'
})
export class CalculatorController {

  @SoapOperation(CalculatorResult)
  add(data: CalculatorInput): CalculatorResult {

    return {
      value: data.a + data.b
    };
  }

  @SoapOperation(CalculatorResult)
  subtract(data: CalculatorInput, res: (res: CalculatorResult) => any): Promise<CalculatorResult> {

    return Promise.resolve({
      value: data.a - data.b
    });
  }
}
