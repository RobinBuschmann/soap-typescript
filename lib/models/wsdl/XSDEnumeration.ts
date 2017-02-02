import {XMLAttribute} from "xml-decorators";

export class XSDEnumeration {

  @XMLAttribute
  value: any;

  constructor(value: any) {

    this.value = value;
  }
}
