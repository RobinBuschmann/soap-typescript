import { XSDElement } from './XSDElement';
export declare class XSDChoice {
    name: string;
    private minOccurs?;
    private maxOccurs?;
    private elements;
    constructor(name: string);
    getElements(): XSDElement[];
    addElement(element: XSDElement): void;
    addOptions(options: any): void;
}
