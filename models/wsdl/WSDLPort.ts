import {SOAPAddress} from "./SOAPAddress";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class WSDLPort {

  @XMLAttribute
  name: string;

  @XMLAttribute
  binding: string;

  @XMLChild({namespace: 'soap'})
  address: SOAPAddress;

  constructor(options: any) {

    this.name = options.name;
    this.binding = options.binding;
    this.address = new SOAPAddress(options.address);
  }
}
