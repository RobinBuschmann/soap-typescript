import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {ExampleRequestChildData} from "./ExampleRequestChildData";
import {ExampleRequestChildData2} from "./ExampleRequestChildData2";

@XSDComplexType
export class ExampleRequestData {

  private static Choice = 'ExampleChoice';

  @XSDElement({
    enumeration: ['A', 'B', 'C'],
    minOccurs: 1,
    maxOccurs: 1
  })
  exampleEnum: string;

  @XSDElement
  exampleNum: number;

  @XSDElement({
    minLength: 1,
    maxLength: 5
  })
  exampleString: string;

  @XSDElement({
    pattern: /test/
  })
  examplePattern: string;

  @XSDElement({
    choiceName: ExampleRequestData.Choice
  })
  exampleChoice1: string;

  @XSDElement({
    choiceName: ExampleRequestData.Choice
  })
  exampleChoice2: string;

  @XSDElement
  exampleChild: ExampleRequestChildData;

  @XSDElement({
    arrayType: ExampleRequestChildData2
  })
  exampleChild2: ExampleRequestChildData2[];

}
