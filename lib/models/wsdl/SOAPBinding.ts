import {HTTP_URL, STYLE} from "../../utils";
import {XMLAttribute} from "xml-decorators";

export class SOAPBinding {

  @XMLAttribute
  style: string = STYLE;

  @XMLAttribute
  transport: string = HTTP_URL;
}
