import 'es6-shim';
import 'reflect-metadata';
import { XSDComplexType } from "./models/wsdl/XSDComplexType";
export declare const WSDL_URL: string;
export declare const WSDL_NS: string;
export declare const SOAP_URL: string;
export declare const SOAP_NS: string;
export declare const XSD_URL: string;
export declare const XSD_NS: string;
export declare const TNS_NS: string;
export declare const XMLNS_NS: string;
export declare const HTTP_URL: string;
export declare const STYLE: string;
export declare const TYPE_SUFFIX: string;
export declare const PORT_TYPE_SUFFIX: string;
export declare const MESSAGE_SUFFIX: string;
export declare const BINDING_SUFFIX: string;
/**
 * Returns stored object via reflect meta data. If type is specified,
 * the requested object will be instantiated and stored via reflec metadata
 */
export declare function getObjectViaReflect(key: string, targetClass: any, type?: any): XSDComplexType;
/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export declare function getXSDTypeByValue(value: any): string;
/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export declare function getXSDTypeByDataType(type: any): string;
/**
 * Adds xsd namespace to specified string and returns this value
 */
export declare function addXSDNamespace(str: string): string;
/**
 * Adds tns namespace to specified string and returns this value
 */
export declare function addCustomNamespace(str: string): string;
