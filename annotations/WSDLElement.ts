import {IWSDLElementOptions} from "../interfaces/IWSDLElementOptions";
import {XSDElement} from "../models/wsdl/XSDElement";

export function WSDLElement(target: any, key: string): any;
export function WSDLElement(options: IWSDLElementOptions): any;
export function WSDLElement(...args: any[]): any {

  if (args.length === 1) {

    return (target: any, key: string) => XSDElement.process(target, key, args[0]);
  } else if (args.length === 2) {

    XSDElement.process(args[0], args[1]);
    return;
  }

  throw new Error('Wrong number of parameters');
}
