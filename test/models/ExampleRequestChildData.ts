import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {XSDAttribute} from "../../lib/annotations/XSDAttribute";

@XSDComplexType({
  prefix: 'Super',
  suffix: 'Type'
})
export class ExampleRequestChildData {

  @XSDElement({
    enumeration: ['A', 'B', 'C', 'D'],
    minOccurs: 1,
    maxOccurs: 1,
    simpleTypeName: 'specialEnum' // to prevent this property from being overridden by "ExampleRequestData.exampleEnum"
  })
  exampleEnum: string;

  @XSDElement({
    enumeration: [1, 2, 3, 4],
    minOccurs: 1,
    maxOccurs: 1,
    type: 'xsd:decimal',
    attributes: {
      unit: {
        type: 'xsd:string',
        pattern: /sample/
      }
    }
  })
  exampleNumEnum: number;

  @XSDAttribute({
    maxLength: 100
  })
  attr: string;

}
