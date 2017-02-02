import {addCustomNamespace} from "../../utils";
import {XSDSimpleType} from "./XSDSimpleType";
import {XMLAttribute} from "xml-decorators";
import {IXSDFullAttributeOptions} from "../../interfaces/IXSDFullAttributeOptions";
import {XSDNSType} from "../../utils";
import {IXSDAttributeOptions} from "../../interfaces/IXSDAttributeOptions";
import {XSDComplexType} from "./XSDComplexType";
import {IXSDAttributeTypeReqOptions} from "../../interfaces/IXSDAttributeTypeReqOptions";
import {getXSDTypeByDataType} from "../../utils";

export class XSDAttribute {

  @XMLAttribute
  name: string;

  readonly nsName: string;

  @XMLAttribute
  private type: XSDNSType|string;

  @XMLAttribute
  private default?: string;

  @XMLAttribute
  private fixed?: string;

  @XMLAttribute
  private form?: 'qualified' | 'unqualified';

  @XMLAttribute
  private id?: string;

  @XMLAttribute
  private ref?: string;

  @XMLAttribute
  private use?: 'optional' | 'prohibited' | 'required';

  static annotate(target: any, key: string, options: IXSDAttributeOptions = {}): void {

    const complexType = XSDComplexType.getOrCreateIfNotExist(target);

    if (!options.type) {

      const propertyType = Reflect.getMetadata('design:type', target, key);
      options.type = getXSDTypeByDataType(propertyType);
    }

    complexType.addAttributes(this.createElement(key, options as IXSDAttributeTypeReqOptions));
  }

  static createElements(attributeOptions: {[name: string]: IXSDAttributeTypeReqOptions}): XSDAttribute[] {

    return Object
      .keys(attributeOptions)
      .map(attrname => {

        const options = attributeOptions[attrname];
        return this.createElement(attrname, (options as IXSDAttributeTypeReqOptions));
      });
  }

  static createElement(name: string, options: IXSDAttributeTypeReqOptions): XSDAttribute {

    const fullOptions: IXSDFullAttributeOptions = Object.assign({name}, options);
    const simpleType = XSDSimpleType.tryCreateElement(fullOptions);
    // override type from simple type name
    if (simpleType) fullOptions.type = simpleType.nsName;

    return new XSDAttribute(fullOptions, simpleType);
  }

  getSimpleType(): XSDSimpleType|undefined {

    return this.simpleType;
  }

  private constructor(options: IXSDFullAttributeOptions,
                      private simpleType?: XSDSimpleType) {

    this.name = options.name;
    this.nsName = addCustomNamespace(options.name);
    this.type = options.type;
    this.id = options.id;
    this.default = options.default;
    this.fixed = options.fixed;
    this.form = options.form;
    this.use = options.use;
    this.ref = options.ref;

  }
}
