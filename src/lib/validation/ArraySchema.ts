import { BasicSchema } from ".";
import {
  BasicSchemaParameters,
  NestedValidationResult,
  ValidationResult,
} from "./types";

export class ArraySchema<T extends BasicSchema> extends BasicSchema {
  protected _min: number = 0;
  protected _minParams?: BasicSchemaParameters;

  protected _max: number = Infinity;
  protected _maxParams?: BasicSchemaParameters;

  constructor(public _childrenSchema: T) {
    super();

    this.unshiftValidation(
      (value) =>
        Array.isArray(value) ||
        this.makeError(BasicSchema.defaultErrorMessages.array),
    );
    this.pushValidation(
      (value) =>
        value.length >= this._min ||
        this.makeError(
          this._minParams?.message || BasicSchema.defaultErrorMessages.arrayMin,
          { min: this._min },
        ),
    );
    this.pushValidation(
      (value) =>
        value.length <= this._max ||
        this.makeError(
          this._minParams?.message || BasicSchema.defaultErrorMessages.arrayMax,
          { min: this._max },
        ),
    );
  }

  max(n: number, additionalParams?: BasicSchemaParameters) {
    this._max = n;
    this._maxParams = additionalParams;
    return this;
  }

  min(n: number, additionalParams?: BasicSchemaParameters) {
    this._min = n;
    this._minParams = additionalParams;
    return this;
  }

  _innerValidate(value: any): ValidationResult {
    const result = super._innerValidate(value);

    const subValidations: NestedValidationResult[] = [];

    for (let i = 0; i < (value as any[]).length; i++) {
      const c = (value as any[])[i];
      const currentResult = this._childrenSchema._innerValidate(c);
      if (currentResult !== true) {
        subValidations.push({ ...currentResult, path: i });
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
