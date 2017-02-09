export {WSDLDefinitions} from "./lib/models/WSDLDefinitions";

export {ISoapServiceOptions} from './lib/interfaces/ISoapServiceOptions';
export {ISoapOptions} from './lib/interfaces/ISoapOptions';

export {SoapClient} from './lib/annotations/SoapClient';
export {SoapOperation} from './lib/annotations/SoapOperation';
export {SoapService} from './lib/annotations/SoapService';

export {soap} from './lib/express-middleware'

export {createWsdl, getWsdlDefinitions} from './lib/soap-decorators';

// xsd-decorators
export {
  XSDAttribute,
  XSDElement,
  XSDComplexType,
  IXSDAttributeOptions,
  IXSDElementOptions,
  IXSDComplexTypeOptions,
} from 'xsd-decorators';
