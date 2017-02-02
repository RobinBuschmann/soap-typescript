import {IXSDElementOptions} from "../interfaces/IXSDElementOptions";
import {XSDElement as XSDElementModel} from "../models/wsdl/XSDElement";

export function XSDElement(target: any, key: string): any;
export function XSDElement(options: IXSDElementOptions): any;
export function XSDElement(...args: any[]): any {

  if (args.length === 1) {

    return (target: any, key: string) => XSDElementModel.process(target, key, args[0]);
  } else if (args.length > 1) {

    XSDElementModel.process(args[0], args[1]);
    return;
  }

  throw new Error('Wrong number of parameters');
}
