
export interface ISoapServiceOptions {
  path: string;
  portName: string;
  serviceName: string;

  // default is current url
  targetNamespace?: string;
}

