import {WSDLDefinitions} from "./lib/models/wsdl/WSDLDefinitions";
import {xml} from 'xml-decorators';

export {IFullXSDElementOptions} from './lib/interfaces/IFullXSDElementOptions';
export {ISoapServiceOptions} from './lib/interfaces/ISoapServiceOptions';
export {IWSDLChoiceOptions} from './lib/interfaces/IXSDChoiceOptions';
export {IXSDComplexTypeOptions} from './lib/interfaces/IXSDComplexTypeOptions';
export {IXSDElementOptions} from './lib/interfaces/IXSDElementOptions';
export {IXSDAttributeTypeReqOptions} from './lib/interfaces/IXSDAttributeTypeReqOptions';
export {IXSDAttributeOptions} from './lib/interfaces/IXSDAttributeOptions';

export {SoapClient} from './lib/annotations/SoapClient';
export {SoapOperation} from './lib/annotations/SoapOperation';
export {SoapService} from './lib/annotations/SoapService';

export {XSDComplexType} from './lib/annotations/XSDComplexType';
export {XSDElement} from './lib/annotations/XSDElement';
export {XSDAttribute} from './lib/annotations/XSDAttribute';

export function createWsdl(_class: any): string {
  const wsdlDefinition = WSDLDefinitions.getWSDLDefinitions(_class.prototype, false);

  return xml.serialize('wsdl:definitions', wsdlDefinition);
}
