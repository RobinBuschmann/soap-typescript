import {WSDLDefinitions} from "../models/WSDLDefinitions";

export function SoapOperation(responseDataType: any): any {

  return (target: any, key: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const requestDataType = Reflect.getMetadata('design:paramtypes', target, key)[0];
    const operation = descriptor.value as Function;

    if (!requestDataType) {
      throw new Error(`The first parameter of '${key}' operation need a type annotation for specifying the soap input message type`);
    }

    descriptor.value = function(data: any, res: Function, ...args: any[]): void {
      const requestData = new requestDataType();
      Object.keys(data)
        .forEach(requestDataKey => {
          requestData[requestDataKey] = data[requestDataKey];
        });
      Promise.resolve()
        .then(() => operation.call(this, requestData, ...args))
        .then(response => res(undefined, response))
        .catch(err => res(err))
        ;
    };
    WSDLDefinitions.processOperation(target, key, requestDataType, responseDataType);
  };
}
