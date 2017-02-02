import {WSDLOperation} from './WSDLOperation';
import {addCustomNamespace} from "../../utils";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";

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
