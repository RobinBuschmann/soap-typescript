import {XSDComplexType, XSDElement} from "../../index";

@XSDComplexType
export class ExampleResponseData {

  @XSDElement
  result: string;

}
