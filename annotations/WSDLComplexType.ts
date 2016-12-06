import {XSDComplexType} from "../models/wsdl/XSDComplexType";
import {IWSDLComplexTypeOptions} from "../interfaces/IWSDLComplexTypeOptions";

export function WSDLComplexType(targetClass: any): any;
export function WSDLComplexType(options: IWSDLComplexTypeOptions): any;
export function WSDLComplexType(arg: any): any {

  if (typeof arg === 'function') {

    XSDComplexType.process(arg);
    return;
  } else if (typeof arg === 'object') {

    return (targetClass: any) => XSDComplexType.process(targetClass, arg);
  }

  throw new Error('Wrong number of parameters');
}
