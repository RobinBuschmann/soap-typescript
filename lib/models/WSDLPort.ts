import {SOAPAddress} from "./SOAPAddress";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";

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
