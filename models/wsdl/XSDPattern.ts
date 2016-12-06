import {IFullWSDLElementOptions} from "../../interfaces/IFullWSDLElementOptions";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";

export class XSDPattern {

  @XMLAttribute
  value: string|RegExp;

  constructor(options: IFullWSDLElementOptions) {

    if (options.pattern) {

      this.value = options.pattern.source;
    } else if (options.minLength || options.maxLength) {

      this.value = `^.{${options.minLength || 0},${options.maxLength || ''}}$`;
    }
  }

}
