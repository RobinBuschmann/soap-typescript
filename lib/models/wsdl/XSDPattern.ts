import {IFullXSDElementOptions} from "../../interfaces/IFullXSDElementOptions";
import {XMLAttribute} from "xml-decorators";

export class XSDPattern {

  @XMLAttribute
  value: string|RegExp;

  constructor(options: IFullXSDElementOptions) {

    if (options.pattern) {

      this.value = options.pattern.source;
    } else if (options.minLength || options.maxLength) {

      this.value = `^.{${options.minLength || 0},${options.maxLength || ''}}$`;
    }
  }

}
