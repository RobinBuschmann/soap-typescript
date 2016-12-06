import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";

export class SOAPBody {

  @XMLAttribute
  use: string = 'literal';

  @XMLAttribute
  parts: string;

  constructor(options: any) {

    this.parts = options.parts;
  }
}
