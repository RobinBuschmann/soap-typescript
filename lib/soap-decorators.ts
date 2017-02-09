import {xml} from 'xml-decorators';
import {WSDLDefinitions} from "./models/WSDLDefinitions";

export function createWsdl(_class: any,
                           wsdlDefinition: WSDLDefinitions = getWsdlDefinitions(_class)): string {

  return xml.serialize('wsdl:definitions', wsdlDefinition);
}

export function getWsdlDefinitions(instance: any): WSDLDefinitions;
export function getWsdlDefinitions(_class: new(...args: any[]) => any): WSDLDefinitions;
export function getWsdlDefinitions(arg: any): WSDLDefinitions {

  const wsdlDefinition = WSDLDefinitions.getWSDLDefinitions(arg.prototype || arg);

  if (!wsdlDefinition) throw new Error(`"${typeof arg === 'function' ? arg.name : 'This'}" is not a soap service`);

  return wsdlDefinition;
}
