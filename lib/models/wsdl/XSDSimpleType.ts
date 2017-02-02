import {XSDRestriction} from "./XSDRestriction";
import {XSD_NS, addCustomNamespace, TYPE_SUFFIX} from "../../utils";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";
import {IXSDFullAttributeOptions} from "../../interfaces/IXSDFullAttributeOptions";
import {IFullXSDElementOptions} from "../../interfaces/IFullXSDElementOptions";

export class XSDSimpleType {

  @XMLAttribute
  name: string;

  nsName: string;

  @XMLChild({
    namespace: XSD_NS,
  })
  private restriction?: XSDRestriction;

  static tryCreateElement(options: IXSDFullAttributeOptions|IFullXSDElementOptions): XSDSimpleType|undefined {

    if (options.pattern || options.enumeration || options.minLength !== void 0 || options.maxLength !== void 0) {

      return new XSDSimpleType(options);
    }
  }

  private constructor(options: IXSDFullAttributeOptions|IFullXSDElementOptions) {

    this.name = this.determineName(options);
    this.nsName = addCustomNamespace(this.name);
    this.restriction = new XSDRestriction(options);
  }

  private determineName(options: IXSDFullAttributeOptions|IFullXSDElementOptions): string {

    if (options.simpleTypeName) return options.simpleTypeName;

    if (options.minLength !== void 0 || options.maxLength !== void 0) {

      return `Length${options.minLength || 0}${options.maxLength ? '-' + options.maxLength : ''}` + TYPE_SUFFIX;
    }

    return options.name + TYPE_SUFFIX;
  }

}
