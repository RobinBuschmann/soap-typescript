import {WSDLComplexType} from "../../annotations/WSDLComplexType";
import {WSDLElement} from "../../annotations/WSDLElement";

@WSDLComplexType
export class ExampleRequestData {

  private static Choice = 'ExampleChoice';

  @WSDLElement({
    enumeration: ['A', 'B', 'C'],
    minOccurs: 1,
    maxOccurs: 1,
  })
  exampleEnum: string;

  @WSDLElement({
    choiceName: ExampleRequestData.Choice
  })
  exampleChoice1: string;

  @WSDLElement({
    choiceName: ExampleRequestData.Choice
  })
  exampleChoice2: string;

}
