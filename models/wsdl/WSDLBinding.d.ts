import { WSDLOperation } from "./WSDLOperation";
import { SOAPBinding } from "./SOAPBinding";
export declare class WSDLBinding {
    name: string;
    binding: SOAPBinding;
    operations: WSDLOperation[];
    nsName: string;
    private type;
    constructor();
    setName(name: string): void;
    setType(type: string): void;
    addOperation(operation: WSDLOperation): void;
}
