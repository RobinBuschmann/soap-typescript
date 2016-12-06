import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";

export class XSDEnumeration {

  @XMLAttribute
  value: any;

  constructor(value: any) {

    this.value = value;
  }
}
