import 'es6-shim';
import 'reflect-metadata';

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

export const PORT_TYPE_SUFFIX = 'Type';
export const MESSAGE_SUFFIX = 'Message';
export const BINDING_SUFFIX = 'Binding';

export const FORCE_HTTPS_FOR_ADDRESS_LOCATION = 'forceHttpsForAddressLocation';

/**
 * Adds tns namespace to specified string and returns this value
 */
export function addCustomNamespace(str: string): string {

  return TNS_NS + ':' + str;
}
