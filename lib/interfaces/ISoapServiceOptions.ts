
export interface ISoapServiceOptions {
  portName: string;
  serviceName: string;

  // default is current url
  locationAddress?: string;
  targetNamespace?: string;

  path?: string; // todo remove?
}

