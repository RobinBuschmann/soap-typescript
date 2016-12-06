import 'es6-shim';
import 'reflect-metadata';
import {XSDComplexType} from "./models/wsdl/XSDComplexType";

export const WSDL_URL = 'http://schemas.xmlsoap.org/wsdl/';
export const WSDL_NS = 'wsdl';
export const SOAP_URL = 'http://schemas.xmlsoap.org/wsdl/soap/';
export const SOAP_NS = 'soap';
export const XSD_URL = 'http://www.w3.org/2001/XMLSchema';
export const XSD_NS = 'xsd';
export const TNS_NS = 'tns';
export const XMLNS_NS = 'xmlns';
export const HTTP_URL = 'http://schemas.xmlsoap.org/soap/http';
export const STYLE = 'document';

export const TYPE_SUFFIX = 'Type';
export const PORT_TYPE_SUFFIX = 'Type';
export const MESSAGE_SUFFIX = 'Message';
export const BINDING_SUFFIX = 'Binding';

/**
 * Returns stored object via reflect meta data. If type is specified,
 * the requested object will be instantiated and stored via reflec metadata
 */
export function getObjectViaReflect(key: string, targetClass: any, type?: any): XSDComplexType {

  let complexType = Reflect.getMetadata(key, targetClass);

  if (!complexType && type) {
    complexType = new type();
    Reflect.defineMetadata(key, complexType, targetClass);
  }

  return complexType;
}

/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export function getXSDTypeByValue(value: any): string {

  const type = typeof value;

  switch (type) {

    case 'string':
      return addXSDNamespace('string');
    case 'number':
      return addXSDNamespace('int');
    case 'boolean':
      return addXSDNamespace('boolean');
    default:
      throw Error(`Cannot convert type of given value. Unkown type '${type}'`);
  }
}


/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export function getXSDTypeByDataType(type: any): string {

  switch (type) {

    case String:
      return addXSDNamespace('string');
    case Number:
      return addXSDNamespace('int');
    case Boolean:
      return addXSDNamespace('boolean');
    default:
      throw Error(`Cannot convert type of given value. Unkown type '${type}'`);
  }
}

/**
 * Adds xsd namespace to specified string and returns this value
 */
export function addXSDNamespace(str: string): string {

  return XSD_NS + ':' + str;
}

/**
 * Adds tns namespace to specified string and returns this value
 */
export function addCustomNamespace(str: string): string {

  return TNS_NS + ':' + str;
}
