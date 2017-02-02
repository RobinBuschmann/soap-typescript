import {IWSDLChoiceOptions} from "./IXSDChoiceOptions";

export interface IXSDComplexTypeOptions {

  name?: string;
  suffix?: string;
  prefix?: string;
  choices?: {[name: string]: IWSDLChoiceOptions};
}
