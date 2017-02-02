import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";

@XSDComplexType({
  name: 'ChildType'
})
export class ExampleRequestChildData2 {

  @XSDElement
  value: string;

}
