import {addCustomNamespace, getXSDTypeByDataType} from "../../utils";
import * as _ from "lodash";
import {XSDComplexType} from "./XSDComplexType";
import {IFullWSDLElementOptions} from "../../interfaces/IFullWSDLElementOptions";
import {IWSDLElementOptions} from "../../interfaces/IWSDLElementOptions";
import {XSDSimpleType} from "./XSDSimpleType";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";

export class XSDElement {

  @XMLAttribute
  name: string;

  readonly nsName: string;

  @XMLAttribute
  private type: string;

  @XMLAttribute
  private minOccurs?: number;

  @XMLAttribute
  private maxOccurs?: number|'unbounded';

  private simpleType?: XSDSimpleType;

  static process(target: any, key: string, options: IWSDLElementOptions = {}): void {

    options = _.cloneDeep(options);

    const targetClass = target.constructor;
    const parentComplexType = XSDComplexType.getXSDComplexType(targetClass);
    let propertyType = Reflect.getMetadata('design:type', target, key);

    options['name'] = key;

    if (propertyType === Array) {

      if (!options.arrayType) {

        throw new Error(`In case of arrays you have to define the type of this array in the (options.arrayType).`);
      }

      if (options.maxOccurs === void 0) {

        // ensures, that the incoming data
        // will be mapped to an array
        options.maxOccurs = 'unbounded';
      }

      propertyType = options.arrayType;
    }

    const complexType = XSDComplexType.getXSDComplexType(propertyType, false);
    const element = this.createElement(options, complexType, propertyType);

    if ((options.enumeration || options.pattern) && complexType) {

      throw new Error(`Restrictions(enumeration, pattern) are only allowed for simple types (string, int, boolean, ...)`);
    }

    if (options.choiceName) {
      parentComplexType.addChoiceElement(options.choiceName, element);
    } else {
      parentComplexType.addElement(element);
    }
  }

  static createElement(options: IFullWSDLElementOptions, complexType: XSDComplexType, propertyType: any): XSDElement {

    if (complexType) options.type = complexType.nsName;
    options.type = options.type || getXSDTypeByDataType(propertyType);

    return new XSDElement(options, complexType);
  }

  getComplexType(): XSDComplexType {

    return this.complexType;
  }

  getAllComplexTypesRecursively(complexTypes: XSDComplexType[] = []): XSDComplexType[] {

    if (this.complexType) {

      complexTypes.push(this.complexType);

      this.complexType
        .getAllElements()
        .forEach(element => element.getAllComplexTypesRecursively(complexTypes))
      ;
    }

    return complexTypes;
  }

  getAllSimpleTypesRecursively(simpleTypes: XSDSimpleType[] = []): XSDSimpleType[] {

    if (this.simpleType) {

      simpleTypes.push(this.simpleType);
    }

    if (this.complexType) {
      this.complexType
        .getAllElements()
        .forEach(element => element.getAllSimpleTypesRecursively(simpleTypes))
      ;
    }

    return simpleTypes;
  }

  private constructor(private options: IFullWSDLElementOptions,
                      private complexType?: XSDComplexType) {

    this.name = options.name;
    this.nsName = addCustomNamespace(options.name);
    this.type = options.type;
    this.minOccurs = options.minOccurs;
    this.maxOccurs = options.maxOccurs;

    if (options.pattern || options.enumeration || options.minLength !== void 0 || options.maxLength !== void 0) {

      this.simpleType = new XSDSimpleType(options);
      this.type = this.simpleType.nsName;
    }
  }
}
