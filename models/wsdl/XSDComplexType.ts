import {getObjectViaReflect, addCustomNamespace} from "../../utils";
import {XSDElement} from "./XSDElement";
import {XSDChoice} from "./XSDChoice";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

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

  static getXSDComplexType(targetClass: any, createIfNotExists: boolean = true): XSDComplexType {

    return getObjectViaReflect('xsd:complexType', targetClass, createIfNotExists ? XSDComplexType : null);
  }

  static process(targetClass: any, options: any = {}): void {

    const complexType = this.getXSDComplexType(targetClass);

    complexType.name = options.name || targetClass.name;
    if (options.suffix) complexType.name = complexType.name + options.suffix;
    complexType.nsName = addCustomNamespace(complexType.name);

    if (options.choices) {
      for (let choiceName in options.choices) {
        if (options.choices.hasOwnProperty(choiceName)) {
          complexType.addChoiceOptions(choiceName, options.choices[choiceName]);
        }
      }
    }
  }

  getAllElements(): XSDElement[] {

    const elements = [];

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

  addElement(element: XSDElement): void {

    if (!this.elements) this.elements = [];

    this.elements.push(element);
  }

  addChoiceElement(choiceName: string, element: XSDElement): void {

    if (!this.choices) this.choices = [];

    let choice = this.getChoice(choiceName);

    choice.addElement(element);
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

  private addChoiceOptions(choiceName: string, options: any): void {

    let choice = this.getChoice(choiceName);

    choice.addOptions(options);
  }
}
