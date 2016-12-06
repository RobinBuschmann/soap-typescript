import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";

export class SOAPOperation {

  @XMLAttribute
  soapAction: string;

  constructor(soapAction: string) {

    this.soapAction = soapAction;
  }
}
