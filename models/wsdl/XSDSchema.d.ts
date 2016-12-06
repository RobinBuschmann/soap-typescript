import { XSDElement } from "./XSDElement";
import { XSDComplexType } from "./XSDComplexType";
export declare class XSDSchema {
    readonly attributeFormDefault: string;
    readonly wsdl: string;
    readonly xsd: string;
    readonly elementFormDefault: string;
    private targetNamespace;
    private elements;
    private hasElement;
    private complexTypes;
    private hasComplexType;
    private simpleTypes;
    private hasSimpleType;
    setTargetNamespace(targetNamespace: string): void;
    addElement(element: XSDElement): void;
    addComplexType(complexType: XSDComplexType): void;
    private addSimpleType(simpleType);
}
