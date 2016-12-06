import {SOAPBody} from "./SOAPBody";
import {SOAP_NS} from "../../utils";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class WSDLInputOutput {

  @XMLAttribute
  name: string;

  @XMLAttribute
  message: string;

  @XMLChild({namespace: SOAP_NS})
  body: SOAPBody;

  constructor(options: any) {
    this.message = options.message;
    this.name = options.name;

    if (options.body) {
      this.body = new SOAPBody(options.body);
    }
  }
}
