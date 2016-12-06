import {SOAPClient} from "../models/client/SOAPClient";

export function SoapClient(options: any): any {

  return function (target: any, key: string): any {

    SOAPClient.process(options, target, key);
  };
}
