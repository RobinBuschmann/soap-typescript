import {Client, createClient, ClientSSLSecurity} from "soap";
import * as Promise from "bluebird";
import {XMLElement} from "xml-typescript/models/XMLElement";

export class SOAPClient {

  static process(options: any, target: any, key: string): void {

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

        return XMLElement.getSchemaAsync(args);
      })
      .then(_args => new Promise((resolve, reject) => {
        client[operation](_args,
          (err, data) => {

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

  private static createClient(options: any): Promise<Client> {

    options.wsdl_options = {
      cert: options.clientCert,
      key: options.clientKey,
      ignoreSchemaValidation: options.ignoreSchemaValidation
    };

    return new Promise<Client>((resolve, reject) => {

      createClient(
        options.wsdlPath + '?wsdl',
        options,
        (err, client: Client) => {

          if (err) {

            reject(err);
            return;
          }

          client.setSecurity(new ClientSSLSecurity(options.clientKey, options.clientCert, '', {}));

          resolve(client);
        }
      );
    });
  }
}
