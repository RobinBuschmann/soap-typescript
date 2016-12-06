import {WSDLOperation} from './WSDLOperation';
import {addCustomNamespace} from "../../utils";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class WSDLPortType {

  nsName: string;

  @XMLAttribute
  private name: string;

  @XMLChild({
    name: 'operation',
    namespace: 'wsdl'
  })
  private operations: WSDLOperation[];

  constructor() {

    this.operations = [];
  }

  setName(name: string): void {

    this.name = name;
    this.nsName = addCustomNamespace(name);
  }

  addOperation(operation: WSDLOperation): void {

    this.operations.push(operation);
  }
}
