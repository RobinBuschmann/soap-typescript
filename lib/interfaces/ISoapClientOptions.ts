
export interface ISoapClientOptions {

  operations: string[];
  wsdlPath: string;
  envelopeKey?: string;
  clientCert?: Buffer|string;
  clientKey?: Buffer|string;
  overrideRootElement?: {
    namespace?: string;
  };

  // only available for https://github.com/RobinBuschmann/sequelize.git
  ignoreSchemaValidation?: boolean;
}

