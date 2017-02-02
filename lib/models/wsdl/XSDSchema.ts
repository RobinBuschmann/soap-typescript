import {XSDElement} from "./XSDElement";
import {XSDComplexType} from "./XSDComplexType";
import {WSDL_URL, XSD_URL, XMLNS_NS, XSD_NS} from "../../utils";
import {XSDSimpleType} from "./XSDSimpleType";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";

export class XSDSchema {

  @XMLAttribute
  readonly attributeFormDefault = 'unqualified';

  @XMLAttribute

  @XMLAttribute({namespace: XMLNS_NS})
  readonly wsdl: string = WSDL_URL;

  @XMLAttribute({namespace: XMLNS_NS})
  readonly xsd: string = XSD_URL;
  readonly elementFormDefault = 'unqualified';

  @XMLAttribute
  private targetNamespace: string;

  @XMLChild({
    stripPluralS: true,
    namespace: XSD_NS
  })
  private elements: XSDElement[];
  private hasElement: {[elementName: string]: boolean} = {};

  @XMLChild({
    stripPluralS: true,
    namespace: XSD_NS
  })
  private complexTypes: XSDComplexType[];
  private hasComplexType: {[complexTypeName: string]: boolean} = {};

  @XMLChild({
    stripPluralS: true,
    namespace: XSD_NS
  })
  private simpleTypes: XSDSimpleType[];
  private hasSimpleType: {[simpleTypeName: string]: boolean} = {};

  setTargetNamespace(targetNamespace: string): void {

    this.targetNamespace = targetNamespace;
  }

  addElement(element: XSDElement): void {

    if (!this.elements) this.elements = [];

    if (!this.hasElement[element.name]) {

      element
        .getAllComplexTypesRecursively()
        .forEach(complexType => this.addComplexType(complexType));

      element
        .getAllSimpleTypesRecursively()
        .forEach(simpleType => this.addSimpleType(simpleType));

      this.elements.push(element);
      this.hasElement[element.name] = true;
    }
  }

  addComplexType(complexType: XSDComplexType): void {

    if (!this.complexTypes) this.complexTypes = [];

    if (!this.hasComplexType[complexType.name]) {

      this.complexTypes.push(complexType);
      this.hasComplexType[complexType.name] = true;
    }
  }

  private addSimpleType(simpleType: XSDSimpleType): void {

    if (!this.simpleTypes) this.simpleTypes = [];

    if (!this.hasSimpleType[simpleType.name]) {

      this.simpleTypes.push(simpleType);
      this.hasSimpleType[simpleType.name] = true;
    }
  }
}
