import {XSDComplexType, XSDElement} from '../../index';

@XSDComplexType
export class CalculatorResult {

  @XSDElement
  value: number;
}
