import {XSDNSType} from "../utils";
import {IRestrictionOptions} from "./IRestrictionOptions";

export interface IXSDAttributeOptions extends IRestrictionOptions {

  type?: XSDNSType;
  simpleTypeName?: string;
  default?: string;
  fixed?: string;
  form?: 'qualified'|'unqualified';
  id?: string;
  ref?: string;
  use?: 'optional'|'prohibited'|'required';
}
