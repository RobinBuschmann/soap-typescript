import {createSoapServer} from "express-soap";
import {Router} from "express";
import {ISoapOptions as IOriginalSoapOptions} from "express-soap/lib/interfaces/ISoapOptions";
import {getWsdlDefinitions} from "../index";
import {createWsdl} from "../index";
import {FORCE_HTTPS_FOR_ADDRESS_LOCATION} from "./utils";
import {ISoapOptions} from "./interfaces/ISoapOptions";

export function soap<T>(service: any, options?: ISoapOptions): Router;
export function soap<T>(_class: new(...args: any[]) => T, options?: ISoapOptions): Router;
export function soap<T>(arg: new(...args: any[]) => T|any, options?: ISoapOptions): Router {

  options = Object.assign({}, options || {});

  const router = Router();
  const wsdlDefinition = getWsdlDefinitions(arg);
  const wsdl = createWsdl(arg, wsdlDefinition);

  let service;

  if (typeof arg === 'function') {

    if (!options.injector && !options.injectorGetter) {
      throw new Error(`When passing a class, an injector or injectorGetter is needed, to create an instance.`);
    }

    const getter = options.injector ? options.injector.get : options.injectorGetter as Function;
    service = getter.call(options.injector || null, arg);

  } else {
    service = arg;
  }

  (options as IOriginalSoapOptions).services = {
    [wsdlDefinition.getServiceName()]: {
      [wsdlDefinition.getPortName()]: service
    }
  };
  (options as IOriginalSoapOptions).wsdl = wsdl;
  const server = createSoapServer(router, options as IOriginalSoapOptions);

  server[FORCE_HTTPS_FOR_ADDRESS_LOCATION] = !!options.forceHttpsForAddressLocation;

  return router;
}
