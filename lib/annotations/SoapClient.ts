import {SOAPClient} from "../models/client/SOAPClient";

export function SoapClient(options: any): any {

  return (target: any, key: string) =>  {

    SOAPClient.process(options, target, key);
  };
}
