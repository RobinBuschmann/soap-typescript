
export interface IRestrictionOptions {

  minLength?: number;
  maxLength?: number;
  enumeration?: Array<string|number>;
  pattern?: RegExp;
}
