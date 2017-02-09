import {XMLAttribute} from "xml-decorators";

export class SOAPOperation {

  @XMLAttribute
  soapAction: string;

  constructor(soapAction: string) {

    this.soapAction = soapAction;
  }
}
