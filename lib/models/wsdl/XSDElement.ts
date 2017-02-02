import {addCustomNamespace, getXSDTypeByDataType} from "../../utils";
import * as _ from "lodash";
import {XSDComplexType} from "./XSDComplexType";
import {IXSDElementOptions} from "../../interfaces/IXSDElementOptions";
import {XSDSimpleType} from "./XSDSimpleType";
import {XMLAttribute} from "xml-decorators";
import {IFullXSDElementOptions} from "../../interfaces/IFullXSDElementOptions";
import {XSDExtension} from "./XSDExtension";
import {XSDAttribute} from "./XSDAttribute";

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

  static process(target: any, key: string, options: IXSDElementOptions = {}): void {

    options = _.cloneDeep(options);

    const parentComplexType = XSDComplexType.getOrCreateIfNotExist(target);
    let propertyType = Reflect.getMetadata('design:type', target, key);

    (options as IFullXSDElementOptions).name = key;

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

    const complexType = XSDComplexType.getXSDComplexType(propertyType.prototype);
    const element = this.createElement(options as IFullXSDElementOptions, complexType, propertyType);

    if (options.choiceName) {
      parentComplexType.addChoiceElement(options.choiceName, element);
    } else {
      parentComplexType.addElement(element);
    }
  }

  static createElement(options: IFullXSDElementOptions,
                       complexType?: XSDComplexType,
                       propertyType?: any): XSDElement {

    let simpleType;

    if (complexType) {

      if (options.enumeration || options.pattern) {

        throw new Error(`Restrictions(enumeration, pattern) are only allowed for simple types (string, int, boolean, ...)`);
      }

      if (!!options.type) {
        throw new Error(`Custom type names for ComplexTypes are not allowed ("${complexType.name}")`);
      }

      if (!!options.attributes) {
        throw new Error(`Attributes of complex types have to be defined on the specified complex ` +
          `type itself ("${complexType.name}"). Attributes can only be defined for simple content.`);
      }

      options.type = complexType.nsName;
    } else {

      options.type = options.type || getXSDTypeByDataType(propertyType);
      simpleType = XSDSimpleType.tryCreateElement(options);

      if (simpleType) {
        // override type from simple type name
        options.type = simpleType.nsName;
      }

      if (options.attributes) {

        const SIMPLE_CONTENT_SUFFIX = 'SimpleContentType';
        complexType = XSDComplexType.processElement({name: options.name + SIMPLE_CONTENT_SUFFIX});
        complexType.setExtension(new XSDExtension(options.type, XSDAttribute.createElements(options.attributes)));

        options.type = complexType.nsName;
      }
    }

    return new XSDElement(options, complexType, simpleType);
  }

  getComplexType(): XSDComplexType|undefined {

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
        .forEach(element => element.getAllSimpleTypesRecursively(simpleTypes));

      this.complexType
        .getAllAttributes()
        .forEach(attribute => {
          const simpleType = attribute.getSimpleType();

          if (simpleType) {
            simpleTypes.push(simpleType);
          }
        });
    }

    return simpleTypes;
  }

  private constructor(options: IFullXSDElementOptions,
                      private complexType?: XSDComplexType,
                      private simpleType?: XSDSimpleType) {

    this.name = options.name;
    this.nsName = addCustomNamespace(options.name);
    this.type = options.type;
    this.minOccurs = options.minOccurs;
    this.maxOccurs = options.maxOccurs;

  }
}
