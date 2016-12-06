import {
  WSDL_URL, SOAP_URL, XSD_URL, XMLNS_NS, WSDL_NS, PORT_TYPE_SUFFIX, BINDING_SUFFIX,
  MESSAGE_SUFFIX, XSD_NS
} from "../../utils";
import * as soap from 'soap';
import {WSDLBinding} from "./WSDLBinding";
import {WSDLService} from "./WSDLService";
import {WSDLPortType} from "./WSDLPortType";
import {WSDLMessage} from "./WSDLMessage";
import {XSDSchema} from "./XSDSchema";
import {XSDElement} from "./XSDElement";
import {XSDComplexType} from "./XSDComplexType";
import {WSDLOperation} from "./WSDLOperation";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class WSDLDefinitions {

  @XMLAttribute({namespace: XMLNS_NS})
  soap: string = SOAP_URL;

  @XMLAttribute({namespace: XMLNS_NS})
  xsd: string = XSD_URL;

  @XMLAttribute({namespace: XMLNS_NS})
  wsdl: string = WSDL_URL;

  @XMLAttribute
  private name: string;

  @XMLAttribute
  private targetNamespace: string;

  @XMLAttribute({namespace: XMLNS_NS})
  private tns: string;

  @XMLChild({
    namespace: XSD_NS,
    implicitStructure: 'wsdl:types.$'
  })
  private readonly schema: XSDSchema;

  @XMLChild({
    name: 'message',
    namespace: WSDL_NS,
  })
  private messages: WSDLMessage[];
  private hasMessage: {[messageName: string]: boolean} = {};

  @XMLChild({namespace: WSDL_NS})
  private portType: WSDLPortType;

  @XMLChild({namespace: WSDL_NS})
  private binding: WSDLBinding;

  @XMLChild({namespace: WSDL_NS})
  private service: WSDLService;

  private servicePath: string;

  static processService(targetClass: any, options: any): void {

    const definitions = this.getWSDLDefinitions(targetClass);

    definitions.servicePath = options.path;

    definitions.targetNamespace = options.targetNamespace || soap['CURRENT_URL_PLACEHOLDER'];
    definitions.tns = definitions.targetNamespace;
    definitions.name = options.serviceName;

    definitions.schema.setTargetNamespace(definitions.targetNamespace);
    definitions.portType.setName(options.portName + PORT_TYPE_SUFFIX);

    definitions.binding.setName(options.serviceName + BINDING_SUFFIX);
    definitions.binding.setType(definitions.portType.nsName);

    definitions.service = new WSDLService({
      name: options.serviceName,
      port: {
        binding: definitions.binding.nsName,
        name: options.portName,
        address: {location: definitions.targetNamespace}
      }
    });
  }

  static processOperation(target: string, key: string, requestDataType: any, responseDataType: any): void {

    const targetClass = target.constructor;
    const definitions = this.getWSDLDefinitions(targetClass);

    const requestComplexType = XSDComplexType.getXSDComplexType(requestDataType, false);
    const requestElement = XSDElement.createElement({name: key}, requestComplexType, requestDataType);
    definitions.schema.addElement(requestElement);
    const requestPartName = key;
    const requestMessage = new WSDLMessage({
      name: key + MESSAGE_SUFFIX,
      part: {name: requestPartName, element: requestElement.nsName}
    });
    definitions.addMessage(requestMessage);

    const responseComplexType = XSDComplexType.getXSDComplexType(responseDataType, false);
    const responseElement = XSDElement.createElement({name: responseComplexType.name}, responseComplexType, responseDataType);
    definitions.schema.addElement(responseElement);
    const responsePartName = responseComplexType.name;
    const responseMessage = new WSDLMessage({
      name: responseComplexType.name + MESSAGE_SUFFIX,
      part: {name: responsePartName, element: responseElement.nsName}
    });
    definitions.addMessage(responseMessage);

    definitions.portType.addOperation(new WSDLOperation({
      name: key,
      input: {message: requestMessage.nsName},
      output: {message: responseMessage.nsName}
    }));

    definitions.binding.addOperation(new WSDLOperation({
      name: key,
      soapOperation: true,
      input: {body: {parts: requestPartName}},
      output: {body: {parts: responsePartName}}
    }));
  }

  static getWSDLDefinitions(targetClass: any, createIfNotExist: boolean = true): WSDLDefinitions {
    const REFLECT_KEY = 'wsdl:definitions';
    let definitions = Reflect.getMetadata(REFLECT_KEY, targetClass);

    if (!definitions && createIfNotExist) {

      definitions = new WSDLDefinitions();
      Reflect.defineMetadata(REFLECT_KEY, definitions, targetClass);
    }
    return definitions;
  }

  getServiceName(): string {

    return this.service.name;
  }

  getPortName(): string {

    return this.service.port.name;
  }

  getServicePath(): string {

    return this.servicePath;
  }

  private constructor() {

    this.schema = new XSDSchema();
    this.portType = new WSDLPortType();
    this.binding = new WSDLBinding();
    this.messages = [];
  }

  private addMessage(message: WSDLMessage): void {

    if (!this.hasMessage[message.name]) {

      this.messages.push(message);
      this.hasMessage[message.name] = true;
    }
  }
}
