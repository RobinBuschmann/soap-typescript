import {addCustomNamespace} from "../../utils";
import {XSDElement} from "./XSDElement";
import {XSDChoice} from "./XSDChoice";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";
import {IXSDComplexTypeOptions} from "../../interfaces/IXSDComplexTypeOptions";
import {XSDAttribute} from "./XSDAttribute";
import {XSDExtension} from "./XSDExtension";

const META_KEY = 'xsd:complexType';

export class XSDComplexType {

  @XMLAttribute
  name: string;

  nsName: string;

  @XMLChild({
    stripPluralS: true,
    namespace: 'xsd',
    implicitStructure: 'xsd:sequence.$'
  })
  private elements: XSDElement[];

  @XMLChild({
    stripPluralS: true,
    namespace: 'xsd',
    implicitStructure: 'xsd:sequence.$'
  })
  private choices: XSDChoice[];

  @XMLChild({
    namespace: 'xsd',
    implicitStructure: 'xsd:simpleContent.$'
  })
  private extension: XSDExtension;

  @XMLChild({
    stripPluralS: true,
    namespace: 'xsd'
  })
  private attributes: XSDAttribute[];

  static getXSDComplexType(target: any): XSDComplexType|undefined {

    return Reflect.getMetadata(META_KEY, target);
  }

  static setXSDComplexType(target: any, complexType: XSDComplexType): void {

    return Reflect.defineMetadata(META_KEY, complexType, target);
  }

  static getOrCreateIfNotExist(target: any): XSDComplexType {
    let complexType = this.getXSDComplexType(target);
    if (!complexType) {
      complexType = this.createElement();
      this.setXSDComplexType(target, complexType);
    }
    return complexType;
  }

  static annotate(target: any, options: IXSDComplexTypeOptions = {}): void {

    const complexType = this.getOrCreateIfNotExist(target);

    this.processElement(options, complexType);
  }

  static processElement(options: IXSDComplexTypeOptions = {},
                        complexType: XSDComplexType = this.createElement()): XSDComplexType {

    complexType.name = options.name as string;
    complexType.name = (options.prefix || '') + complexType.name + (options.suffix || '');
    complexType.nsName = addCustomNamespace(complexType.name);

    if (options.choices) {
      for (const choiceName in options.choices) {
        if (options.choices.hasOwnProperty(choiceName)) {
          complexType.addChoiceOptions(choiceName, options.choices[choiceName]);
        }
      }
    }

    return complexType;
  }

  static createElement(): XSDComplexType {
    return new XSDComplexType();
  }

  getAllElements(): XSDElement[] {

    const elements: XSDElement[] = [];

    if (this.choices) {
      this.choices.forEach(choice => {
        elements.push(...choice.getElements());
      });
    }

    if (this.elements) {

      elements.push(...this.elements);
    }

    return elements;
  }

  getAllAttributes(): XSDAttribute[] {

    const attributes: XSDAttribute[] = [];

    if (this.attributes) {

      attributes.push(...this.attributes);
    }

    if (this.extension) {

      attributes.push(...this.extension.getAttributes());
    }

    return attributes;
  }

  addElement(element: XSDElement): void {

    if (!this.elements) this.elements = [];

    this.elements.push(element);
  }

  addChoiceElement(choiceName: string, element: XSDElement): void {

    if (!this.choices) this.choices = [];

    const choice = this.getChoice(choiceName);

    choice.addElement(element);
  }

  setExtension(extension: XSDExtension): void {

    this.extension = extension;
  }

  addAttributes(...attributes: XSDAttribute[]): void {

    if (!this.attributes) this.attributes = [];

    this.attributes.push(...attributes);
  }

  /**
   * Returns choice; Creates choice if not exists
   */
  getChoice(choiceName: string): XSDChoice {

    let choice = this.choices.find(_choice => _choice.name === choiceName);

    if (!choice) {

      choice = new XSDChoice(choiceName);
      this.choices.push(choice);
    }

    return choice;
  }

  private constructor() {
  }

  private addChoiceOptions(choiceName: string, options: any): void {

    const choice = this.getChoice(choiceName);

    choice.addOptions(options);
  }
}
