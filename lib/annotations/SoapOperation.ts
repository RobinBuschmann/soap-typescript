import {WSDLDefinitions} from "../models/WSDLDefinitions";

export function SoapOperation(responseDataType: any): any {

  return (target: any, key: string, descriptor: TypedPropertyDescriptor<Function>) => {

    const requestDataType = Reflect.getMetadata('design:paramtypes', target, key)[0];

    if (!requestDataType) {

      throw new Error(`The first parameter of '${key}' operation need a type annotation for specifying the soap input message type`);
    }

    WSDLDefinitions.processOperation(target, key, requestDataType, responseDataType);
  };
}
