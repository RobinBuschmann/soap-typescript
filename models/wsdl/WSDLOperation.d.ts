import { WSDLInputOutput } from "./WSDLInputOutput";
import { SOAPOperation } from "./SOAPOperation";
export declare class WSDLOperation {
    name: string;
    input: WSDLInputOutput;
    output: WSDLInputOutput;
    operation: SOAPOperation;
    constructor(options: any);
}
