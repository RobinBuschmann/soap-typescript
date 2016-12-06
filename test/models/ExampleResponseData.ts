import {WSDLComplexType} from "../../annotations/WSDLComplexType";
import {WSDLElement} from "../../annotations/WSDLElement";

@WSDLComplexType
export class ExampleResponseData {

  @WSDLElement
  result: string;

}
