import { BasicSchema } from ".";
import { BasicSchemaParameters } from "./types";

export class StringSchema extends BasicSchema {
  protected _min: number = 0;
  protected _minParams?: BasicSchemaParameters;

  protected _max: number = Infinity;
  protected _maxParams?: BasicSchemaParameters;

  constructor(protected params?: BasicSchemaParameters) {
    super();

    this.unshiftValidation(
      (value) =>
        typeof value === "string" ||
        this.makeError(BasicSchema.defaultErrorMessages.string),
    );
    this.pushValidation(
      (value) =>
        !this._required ||
        !!value ||
        this.makeError(
          this._requiredParams?.message ||
            BasicSchema.defaultErrorMessages.required,
        ),
    );
    this.pushValidation(
      (value) =>
        value.length >= this._min ||
        this.makeError(
          this._minParams?.message ||
            BasicSchema.defaultErrorMessages.stringMin,
          { min: this._min },
        ),
    );
    this.pushValidation(
      (value) =>
        value.length <= this._max ||
        this.makeError(
          this._minParams?.message ||
            BasicSchema.defaultErrorMessages.stringMin,
          { max: this._max },
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
}
