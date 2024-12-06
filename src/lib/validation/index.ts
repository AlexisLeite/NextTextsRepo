import { defaultMessages } from "./defaultMessages";
import {
  BasicSchemaParameters,
  NestedValidationResult,
  ValidationFunction,
  ValidationResult,
} from "./types";

export class BasicSchema {
  protected static defaultErrorMessages = defaultMessages;

  protected _required: boolean = false;
  protected _requiredParams?: BasicSchemaParameters = undefined;

  protected _customValidation?: ValidationFunction;

  protected _validationSteps: ValidationFunction[] = [
    (value) =>
      !this._required ||
      (value !== undefined && value !== null) ||
      this.makeError(
        this._requiredParams?.message ||
          BasicSchema.defaultErrorMessages.required,
      ),
  ];

  customValidation(cb: ValidationFunction) {
    this.pushValidation(cb);
    return this;
  }

  required(additionalParams?: BasicSchemaParameters) {
    this._required = true;
    this._requiredParams = additionalParams;
    return this;
  }

  private appendNested(
    arr: { path: string[]; error: string }[],
    nested: NestedValidationResult,
    basePath?: string[],
  ) {
    if (nested && nested !== true) {
      const path = [...(basePath ?? []), String(nested.path)];

      arr.push({
        path,
        error: this.makeReplacements(nested.errorMessage, nested.replacements)!,
      });

      for (const current of nested.nested ?? []) {
        this.appendNested(arr, current, path);
      }
    }
  }
  private makeReplacements(str?: string, replacements?: Record<string, any>) {
    if (!str) return str;

    let result = str;
    for (const [key, value] of Object.entries(replacements ?? {})) {
      result = result.replaceAll(`{{${key}}}`, value);
    }
    return result;
  }
  validate(value: any): { path: string[]; error: string }[] | true {
    const result = this._innerValidate(value);

    const errors: { path: string[]; error: string }[] = [];

    if (result !== true) {
      errors.push({
        path: [],
        error: this.makeReplacements(result.errorMessage, result.replacements)!,
      });

      for (const c of result.nested ?? []) {
        this.appendNested(errors, c);
      }

      return errors;
    }

    return true;
  }

  _innerValidate(value: any): ValidationResult {
    let result: ValidationResult = true;

    for (const v of this._validationSteps) {
      result = v(value);
      if (result !== true) break;
    }

    return result;
  }
  protected makeError(
    error: string,
    replacements?: Record<string, any>,
    nested?: NestedValidationResult[],
  ): ValidationResult {
    return { errorMessage: error, nested, replacements };
  }

  protected clearValidations() {
    this._validationSteps = [];
  }

  protected pushValidation(cb: ValidationFunction) {
    this._validationSteps.push(cb);
  }

  protected unshiftValidation(cb: ValidationFunction) {
    this._validationSteps.unshift(cb);
  }
}
