import {XMLAttribute} from "xml-decorators";

export class SOAPAddress {

  @XMLAttribute
  location: string;

  constructor(options: any) {

    this.location = options.location;
  }
}
