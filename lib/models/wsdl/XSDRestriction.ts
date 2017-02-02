import {XSDEnumeration} from "./XSDEnumeration";
import {XSDPattern} from "./XSDPattern";
import {IFullXSDElementOptions} from "../../interfaces/IFullXSDElementOptions";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";

export class XSDRestriction {

  @XMLAttribute
  private base: string;

  @XMLChild({namespace: 'xsd'})
  private enumeration?: XSDEnumeration[];

  @XMLChild({namespace: 'xsd'})
  private pattern?: XSDPattern;

  constructor(options: IFullXSDElementOptions) {

    this.validateOptions(options);
    if (options.enumeration) this.enumeration = options.enumeration.map(_enum => new XSDEnumeration(_enum));
    if (options.pattern || options.minLength !== void 0 || options.maxLength !== void 0) this.pattern = new XSDPattern(options);
    this.base = this.getXSDType(options);
  }

  private getXSDType(options: IFullXSDElementOptions): string {

    if (options.type) {

      return options.type;
    }

    throw new Error(`Either base option is not set for XSD restriction or the corresponding type could not been calculated`);
  }

  private validateOptions(options: IFullXSDElementOptions): void {

    if (options.enumeration && options.pattern) {

      throw new Error(`XSD restriction cannot have both enumeration and pattern. Only one option is allowed.`);
    }
    if ((options.enumeration || options.pattern) && (options.minLength !== void 0 || options.maxLength !== void 0)) {

      throw new Error(`Restrictions(enumeration, pattern) and Length restrictions(minLength, maxLength) together are not allowed.`);
    }
  }

}
