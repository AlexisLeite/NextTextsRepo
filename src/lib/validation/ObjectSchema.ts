import { BasicSchema } from ".";
import { NestedValidationResult, ValidationResult } from "./types";

export class ObjectSchema<
  T extends Record<string, BasicSchema>,
> extends BasicSchema {
  constructor(public _schema: T) {
    super();

    this.unshiftValidation(
      (v) =>
        (typeof v && v !== null) ||
        this.makeError(BasicSchema.defaultErrorMessages.object),
    );
  }

  _innerValidate(value: any): ValidationResult {
    const result = super._innerValidate(value);

    const subValidations: NestedValidationResult[] = [];

    for (const [key, currentValue] of Object.entries(value)) {
      const currentResult = this._schema[key]._innerValidate(currentValue);
      if (currentResult !== true) {
        subValidations.push({ ...currentResult, path: key });
      }
    }

    if (subValidations.length === 0) {
      return result;
    }

    if (result === true) {
      return this.makeError(
        BasicSchema.defaultErrorMessages.arrayChildFailed,
        {},
        subValidations,
      );
    }

    return { ...result, nested: subValidations };
  }
}
