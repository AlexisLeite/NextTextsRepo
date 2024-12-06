import { BasicSchema } from ".";
import { BasicSchemaParameters } from "./types";

export class DateSchema extends BasicSchema {
  protected _min?: Date;
  protected _minParams?: BasicSchemaParameters;

  protected _max?: Date;
  protected _maxParams?: BasicSchemaParameters;

  constructor(protected _dateParams?: BasicSchemaParameters) {
    super();

    this.unshiftValidation(
      (value) =>
        value instanceof Date ||
        this.makeError(
          this._dateParams?.message || BasicSchema.defaultErrorMessages.date,
        ),
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
        this._min === undefined ||
        value >= this._min ||
        this.makeError(
          this._minParams?.message || BasicSchema.defaultErrorMessages.dateMin,
          { min: this._min },
        ),
    );
    this.pushValidation(
      (value) =>
        this._max === undefined ||
        value <= this._max ||
        this.makeError(
          this._maxParams?.message || BasicSchema.defaultErrorMessages.dateMax,
          { max: this._max },
        ),
    );
  }

  max(n: Date, additionalParams?: BasicSchemaParameters) {
    this._max = n;
    this._maxParams = additionalParams;
    return this;
  }

  min(n: Date, additionalParams?: BasicSchemaParameters) {
    this._min = n;
    this._minParams = additionalParams;
    return this;
  }
}
