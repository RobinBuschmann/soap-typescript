import { IFullWSDLElementOptions } from "../../interfaces/IFullWSDLElementOptions";
export declare class XSDSimpleType {
    name: string;
    nsName: string;
    private restriction?;
    constructor(options: IFullWSDLElementOptions);
    private determineName(options);
}
