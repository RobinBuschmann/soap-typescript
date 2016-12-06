"use strict";
require('es6-shim');
require('reflect-metadata');
exports.WSDL_URL = 'http://schemas.xmlsoap.org/wsdl/';
exports.WSDL_NS = 'wsdl';
exports.SOAP_URL = 'http://schemas.xmlsoap.org/wsdl/soap/';
exports.SOAP_NS = 'soap';
exports.XSD_URL = 'http://www.w3.org/2001/XMLSchema';
exports.XSD_NS = 'xsd';
exports.TNS_NS = 'tns';
exports.XMLNS_NS = 'xmlns';
exports.HTTP_URL = 'http://schemas.xmlsoap.org/soap/http';
exports.STYLE = 'document';
exports.TYPE_SUFFIX = 'Type';
exports.PORT_TYPE_SUFFIX = 'Type';
exports.MESSAGE_SUFFIX = 'Message';
exports.BINDING_SUFFIX = 'Binding';
/**
 * Returns stored object via reflect meta data. If type is specified,
 * the requested object will be instantiated and stored via reflec metadata
 */
function getObjectViaReflect(key, targetClass, type) {
    var complexType = Reflect.getMetadata(key, targetClass);
    if (!complexType && type) {
        complexType = new type();
        Reflect.defineMetadata(key, complexType, targetClass);
    }
    return complexType;
}
exports.getObjectViaReflect = getObjectViaReflect;
/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
function getXSDTypeByValue(value) {
    var type = typeof value;
    switch (type) {
        case 'string':
            return addXSDNamespace('string');
        case 'number':
            return addXSDNamespace('int');
        case 'boolean':
            return addXSDNamespace('boolean');
        default:
            throw Error("Cannot convert type of given value. Unkown type '" + type + "'");
    }
}
exports.getXSDTypeByValue = getXSDTypeByValue;
/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
function getXSDTypeByDataType(type) {
    switch (type) {
        case String:
            return addXSDNamespace('string');
        case Number:
            return addXSDNamespace('int');
        case Boolean:
            return addXSDNamespace('boolean');
        default:
            throw Error("Cannot convert type of given value. Unkown type '" + type + "'");
    }
}
exports.getXSDTypeByDataType = getXSDTypeByDataType;
/**
 * Adds xsd namespace to specified string and returns this value
 */
function addXSDNamespace(str) {
    return exports.XSD_NS + ':' + str;
}
exports.addXSDNamespace = addXSDNamespace;
/**
 * Adds tns namespace to specified string and returns this value
 */
function addCustomNamespace(str) {
    return exports.TNS_NS + ':' + str;
}
exports.addCustomNamespace = addCustomNamespace;
//# sourceMappingURL=utils.js.map