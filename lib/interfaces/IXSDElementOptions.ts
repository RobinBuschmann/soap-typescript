import {XSDNSType} from "../utils";
import {IRestrictionOptions} from "./IRestrictionOptions";
import {IXSDAttributeTypeReqOptions} from "./IXSDAttributeTypeReqOptions";

export interface IXSDElementOptions extends IRestrictionOptions {

  type?: XSDNSType;
  simpleTypeName?: string;
  choiceName?: string;
  arrayType?: any;
  minOccurs?: number;
  maxOccurs?: number|'unbounded';
  attributes?: {[name: string]: IXSDAttributeTypeReqOptions};
}
