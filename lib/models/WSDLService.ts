import {WSDLPort} from "./WSDLPort";
import {WSDL_NS} from "../utils";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";

export class WSDLService {

  @XMLAttribute
  name: string;

  @XMLChild({namespace: WSDL_NS})
  port: WSDLPort;

  constructor(options: any) {

    this.name = options.name;
    this.port = new WSDLPort(options.port);
  }
}
