import {XSDRestriction} from "./XSDRestriction";
import {XSD_NS, addCustomNamespace, TYPE_SUFFIX} from "../../utils";
import {IFullWSDLElementOptions} from "../../interfaces/IFullWSDLElementOptions";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class XSDSimpleType {

  @XMLAttribute
  name: string;

  nsName: string;

  @XMLChild({
    namespace: XSD_NS,
  })
  private restriction?: XSDRestriction;

  constructor(options: IFullWSDLElementOptions) {

    this.name = this.determineName(options);
    this.nsName = addCustomNamespace(this.name);
    this.restriction = new XSDRestriction(options);
  }

  private determineName(options: IFullWSDLElementOptions): string {

    if (options.minLength !== void 0 || options.maxLength !== void 0) {

      return `Length${options.minLength || 0}${options.maxLength ? '-' + options.maxLength : ''}` + TYPE_SUFFIX;
    }

    return options.name + TYPE_SUFFIX;
  }

}
