import { XSDComplexType } from "./XSDComplexType";
import { IFullWSDLElementOptions } from "../../interfaces/IFullWSDLElementOptions";
import { IWSDLElementOptions } from "../../interfaces/IWSDLElementOptions";
import { XSDSimpleType } from "./XSDSimpleType";
export declare class XSDElement {
    private options;
    private complexType;
    name: string;
    readonly nsName: string;
    private type;
    private minOccurs?;
    private maxOccurs?;
    private simpleType?;
    static process(target: any, key: string, options?: IWSDLElementOptions): void;
    static createElement(options: IFullWSDLElementOptions, complexType: XSDComplexType, propertyType: any): XSDElement;
    getComplexType(): XSDComplexType;
    getAllComplexTypesRecursively(complexTypes?: XSDComplexType[]): XSDComplexType[];
    getAllSimpleTypesRecursively(simpleTypes?: XSDSimpleType[]): XSDSimpleType[];
    private constructor(options, complexType?);
}
