import { XSDElement } from "./XSDElement";
import { XSDChoice } from "./XSDChoice";
export declare class XSDComplexType {
    name: string;
    nsName: string;
    private elements;
    private choices;
    static getXSDComplexType(targetClass: any, createIfNotExists?: boolean): XSDComplexType;
    static process(targetClass: any, options?: any): void;
    getAllElements(): XSDElement[];
    addElement(element: XSDElement): void;
    addChoiceElement(choiceName: string, element: XSDElement): void;
    /**
     * Returns choice; Creates choice if not exists
     */
    getChoice(choiceName: string): XSDChoice;
    private addChoiceOptions(choiceName, options);
}
