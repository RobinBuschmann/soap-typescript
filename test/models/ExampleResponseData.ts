import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";

@XSDComplexType
export class ExampleResponseData {

  @XSDElement
  result: string;

}