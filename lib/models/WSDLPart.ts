import {XMLAttribute} from "xml-decorators";

export class WSDLPart {

  @XMLAttribute
  name: string;

  @XMLAttribute
  element: string;

  constructor(options: any) {

    this.name = options.name;
    this.element = options.element;
  }
}
