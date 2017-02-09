import {addCustomNamespace} from "../utils";
import {WSDLPart} from "./WSDLPart";
import {XMLAttribute} from "xml-decorators";
import {XMLChild} from "xml-decorators";

export class WSDLMessage {

  @XMLAttribute
  name: string;

  @XMLChild({namespace: 'wsdl'})
  part: WSDLPart;

  nsName: string;

  constructor(options: any) {

    this.name = options.name;
    this.nsName = addCustomNamespace(options.name);
    this.part = new WSDLPart(options.part);
  }
}
