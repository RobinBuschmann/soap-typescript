import {WSDL_NS, SOAP_NS, addCustomNamespace} from "../../utils";
import {WSDLOperation} from "./WSDLOperation";
import {SOAPBinding} from "./SOAPBinding";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class WSDLBinding {

  @XMLAttribute
  name: string;

  @XMLChild({
    namespace: SOAP_NS
  })
  binding: SOAPBinding;

  @XMLChild({
    name: 'operation',
    namespace: WSDL_NS
  })
  operations: WSDLOperation[];

  nsName: string;

  @XMLAttribute
  private type: string;

  constructor() {

    this.operations = [];
    this.binding = new SOAPBinding();
  }

  setName(name: string): void {

    this.name = name;
    this.nsName = addCustomNamespace(name);
  }

  setType(type: string): void {

    this.type = type;
  }

  addOperation(operation: WSDLOperation): void {

    this.operations.push(operation);
  }
}
