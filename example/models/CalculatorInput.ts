import {XSDComplexType, XSDElement} from '../../index';

@XSDComplexType
export class CalculatorInput {

  @XSDElement
  a: number;

  @XSDElement
  b: number;

}
