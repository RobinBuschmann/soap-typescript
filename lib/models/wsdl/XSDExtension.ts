import {XMLAttribute, XMLChild} from "xml-decorators";
import {XSDNSType} from "../../utils";
import {XSDAttribute} from "./XSDAttribute";

export class XSDExtension {

  @XMLAttribute
  private base: XSDNSType|string;

  @XMLChild({
    stripPluralS: true,
    namespace: 'xsd'
  })
  private attributes: XSDAttribute[];

  constructor(base: XSDNSType|string,
              attributes: XSDAttribute[]) {

    this.base = base;
    this.attributes = attributes;
  }

  getAttributes(): XSDAttribute[] {
    return this.attributes;
  }
}
