import {SOAPClient} from "../models/SOAPClient";
import {ISoapClientOptions} from "../interfaces/ISoapClientOptions";

export function SoapClient(options: ISoapClientOptions): any {

  return (target: any, key: string) =>  {

    SOAPClient.process(options, target, key);
  };
}
