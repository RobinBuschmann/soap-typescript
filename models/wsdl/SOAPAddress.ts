import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";

export class SOAPAddress {

  @XMLAttribute
  location: string;

  constructor(options: any) {

    this.location = options.location;
  }
}
