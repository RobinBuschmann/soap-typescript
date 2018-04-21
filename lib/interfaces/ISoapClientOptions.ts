import {IOptions, IXmlAttribute} from "soap";

export interface ISoapClientOptions extends IOptions {

  operations: string[];
  wsdlPath: string;
  envelopeKey?: string;
  clientCert?: Buffer|string;
  clientKey?: Buffer|string;
  overrideRootElement?: { namespace: string; xmlnsAttributes?: IXmlAttribute[]; };

  // only available for https://github.com/RobinBuschmann/sequelize.git
  ignoreSchemaValidation?: boolean;
}

