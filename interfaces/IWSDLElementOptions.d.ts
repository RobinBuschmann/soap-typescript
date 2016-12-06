/// <reference types="es6-shim" />
export interface IWSDLElementOptions {
    type?: string;
    choiceName?: string;
    arrayType?: any;
    minLength?: number;
    maxLength?: number;
    minOccurs?: number;
    maxOccurs?: number | 'unbounded';
    enumeration?: (string | number)[];
    pattern?: RegExp;
}
