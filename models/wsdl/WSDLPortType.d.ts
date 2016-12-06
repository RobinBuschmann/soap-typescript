import { WSDLOperation } from './WSDLOperation';
export declare class WSDLPortType {
    nsName: string;
    private name;
    private operations;
    constructor();
    setName(name: string): void;
    addOperation(operation: WSDLOperation): void;
}
