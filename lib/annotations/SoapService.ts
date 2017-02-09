import {ISoapServiceOptions} from "../interfaces/ISoapServiceOptions";
import {WSDLDefinitions} from "../models/WSDLDefinitions";

export function SoapService(options: ISoapServiceOptions): any {

  return (target: any) => {

    WSDLDefinitions.processService(target.prototype, options);
  };
}
