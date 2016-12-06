import { IFullWSDLElementOptions } from "../../interfaces/IFullWSDLElementOptions";
export declare class XSDRestriction {
    private options;
    private base;
    private enumeration?;
    private pattern?;
    constructor(options: IFullWSDLElementOptions);
    private getXSDType(options);
    private validateOptions(options);
}
