export declare class WSDLDefinitions {
    soap: string;
    xsd: string;
    wsdl: string;
    private name;
    private targetNamespace;
    private tns;
    private readonly schema;
    private messages;
    private hasMessage;
    private portType;
    private binding;
    private service;
    private servicePath;
    static processService(targetClass: any, options: any): void;
    static processOperation(target: string, key: string, requestDataType: any, responseDataType: any): void;
    static getWSDLDefinitions(targetClass: any, createIfNotExist?: boolean): WSDLDefinitions;
    getServiceName(): string;
    getPortName(): string;
    getServicePath(): string;
    private constructor();
    private addMessage(message);
}
