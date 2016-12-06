import {IWSDLChoiceOptions} from "./IWSDLChoiceOptions";

export interface IWSDLComplexTypeOptions {

  name: string;
  choices: {[name: string]: IWSDLChoiceOptions};
}
