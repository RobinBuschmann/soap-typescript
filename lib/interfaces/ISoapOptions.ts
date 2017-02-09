
export interface ISoapOptions {

  forceHttpsForAddressLocation?: boolean;
  uri?: string;
  ignoredNamespaces?: {
    namespaces?: any;
  };
  injector?: {get<T>(_class: new(...args: any[]) => T): any};
  valueKey?: any;
  xmlKey?: any;
  escapeXML?: any;
  wsdl_headers?: any;
  wsdl_options?: any;
  httpClient?: any;
  request?: any;
  ignoreBaseNameSpaces?: any;
  forceSoap12Headers?: any;
  overrideRootElement?: any;
  [otherOption: string]: any;
  injectorGetter?<T>(_class: new(...args: any[]) => T): any;
}
