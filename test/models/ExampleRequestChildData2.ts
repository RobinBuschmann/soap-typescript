import {XSDComplexType, XSDElement} from "../../index";

@XSDComplexType({
  name: 'ChildType'
})
export class ExampleRequestChildData2 {

  @XSDElement
  value: string;

}
