import * as soap from 'soap';
import {Request, Response} from "express-serve-static-core";
import {FORCE_HTTPS_FOR_ADDRESS_LOCATION} from "../utils";

/*

 These changes on Server.prototype._requestListener make it possible
 to set the current requested URL to the address or/and the target
 namespace of the soap xml. Since the wsdl is generated through
 class and property decorators, the address should be set
 automatically as well. So it makes sense to set the address to
 the current requested URL.

 */

export const CURRENT_URL_PLACEHOLDER = '{{CURRENT_URL}}';

const Server: any = soap['Server'];
const originalRequestListener = Server.prototype._requestListener;

/**
 * request listener proxy to replace address/target namespace in soap xml
 */
Server.prototype._requestListener = function requestListenerProxy(req: Request, res: Response, next: any): any {

  const originalResWrite: Function = res.write;
  const forceHttpsForAddressLocation = this[FORCE_HTTPS_FOR_ADDRESS_LOCATION];

  res.write = function responseWriteProxy(...args: any[]): boolean {

    if (typeof args[0] === 'string') {

      args[0] = replaceWithCurrentUrl(req, args[0], forceHttpsForAddressLocation);
    }

    return originalResWrite.call(res, ...args);
  };

  return originalRequestListener.call(this, req, res, next);
};

/**
 * Replaces address in soap xml with currently requested url
 */
function replaceWithCurrentUrl(req: Request, value: any, forceHTTPS: boolean): string {

  const regex = new RegExp(CURRENT_URL_PLACEHOLDER, 'g');
  let protocol = req.protocol;

  if (forceHTTPS) {
    protocol = 'https';
  }

  return value.replace(regex, protocol + '://' + req.get('host') + req.baseUrl);
}
