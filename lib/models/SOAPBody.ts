import {XMLAttribute} from "xml-decorators";

export class SOAPBody {

  @XMLAttribute
  use: string = 'literal';

  @XMLAttribute
  parts: string;

  constructor(options: any) {

    this.parts = options.parts;
  }
}
