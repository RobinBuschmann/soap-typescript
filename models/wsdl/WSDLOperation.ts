import {WSDLInputOutput} from "./WSDLInputOutput";
import {WSDL_NS, SOAP_NS} from "../../utils";
import {SOAPOperation} from "./SOAPOperation";
import {XMLAttribute} from "xml-typescript/annotations/XMLAttribute";
import {XMLChild} from "xml-typescript/annotations/XMLChild";

export class WSDLOperation {

  @XMLAttribute
  name: string;

  @XMLChild({namespace: WSDL_NS})
  input: WSDLInputOutput;

  @XMLChild({namespace: WSDL_NS})
  output: WSDLInputOutput;

  @XMLChild({namespace: SOAP_NS})
  operation: SOAPOperation;

  constructor(options: any) {

    this.name = options.name;
    this.input = new WSDLInputOutput(options.input);
    this.output = new WSDLInputOutput(options.output);

    if (options.soapOperation) {
      this.operation = new SOAPOperation(options.name);
    }
  }
}
