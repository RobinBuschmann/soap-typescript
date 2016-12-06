import {XSDElement} from './XSDElement';
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class XSDChoice {

  @XMLAttribute
  private minOccurs?: number;

  @XMLAttribute
  private maxOccurs?: number;

  @XMLChild({
    stripPluralS: true,
    namespace: 'xsd'
  })
  private elements: XSDElement[];

  constructor(public name: string) {

  }

  getElements(): XSDElement[] {

    return this.elements || [];
  }

  addElement(element: XSDElement): void {

    if (!this.elements) this.elements = [];

    this.elements.push(element);
  }

  addOptions(options: any): void {

    this.minOccurs = options.minOccurs;
    this.maxOccurs = options.maxOccurs;
  }
}
