import {Client, createClient, ClientSSLSecurity} from "soap";
import * as Promise from "bluebird";
import {xml} from "xml-decorators";
import {ISoapClientOptions} from "../interfaces/ISoapClientOptions";

export class SOAPClient {

  static process(options: ISoapClientOptions, target: any, key: string): void {
    options = {...options};

    const clientWrapper = target[key] = {};
    const createClientPromise = this.createClient(options);

    // create operation function proxies,
    // to hide creation
    options.operations.forEach(operation => {

      clientWrapper[operation] = (args: any, operationOptions: any = {}) => {

        return createClientPromise
          .then(client => this.callClientOperation(operation, client, args, operationOptions))
          ;
      };
    });
  }

  private static callClientOperation(operation: string, client: Client, args: any, options: any): Promise<any> {

    return Promise.resolve()
      .then(() => {

        if (!client[operation]) throw new Error(`Unknown operation "${operation}"`);

        return xml.getSchemaAsync(args, {attrContainerName: 'attributes'});
      })
      .then(_args => new Promise((resolve, reject) => {
        (client[operation] as Function)(_args,
          (err: any, data: any, headers: any, raw: any) => {

            if (err) {
              reject(err);
              return;
            }
            resolve(data);
          },
          options,
          options.headers);
      }))
    ;
  }

  private static createClient(options: ISoapClientOptions): Promise<Client> {

    options['wsdl_options'] = {
      cert: options.clientCert,
      key: options.clientKey,
      ignoreSchemaValidation: options.ignoreSchemaValidation
    };

    return new Promise<Client>((resolve, reject) => {

      createClient(
        options.wsdlPath + '?wsdl',
        options,
        (err: any, client: Client) => {

          if (err) {

            reject(err);
            return;
          }

          client.setSecurity(new ClientSSLSecurity(options.clientKey as string, options.clientCert as string, '', {}));

          resolve(client);
        }
      );
    });
  }
}
