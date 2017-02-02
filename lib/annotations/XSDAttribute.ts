import {IXSDAttributeOptions} from "../interfaces/IXSDAttributeOptions";
import {XSDAttribute as XSDAttributeModel} from "../models/wsdl/XSDAttribute";

export function XSDAttribute(target: any, key: string): any;
export function XSDAttribute(options: IXSDAttributeOptions): any;
export function XSDAttribute(...args: any[]): any {

  if (args.length === 1) {

    const options = args[0];

    return (target: any, key: string) => XSDAttributeModel.annotate(target, key, options);
  } else if (args.length > 1) {

    const target = args[0];
    const key = args[1];

    XSDAttributeModel.annotate(target, key);
    return;
  }

  throw new Error('Wrong number of parameters');
}
