import { ArraySchema } from "./ArraySchema";
import { DateSchema } from "./DateSchema";
import { ObjectSchema } from "./ObjectSchema";
import { StringSchema } from "./StringSchema";

export type BasicSchemaParameters = {
  message: string;
};

export type ValidationFunction = (value: any) => ValidationResult;

export type FailedValidationResult = {
  errorMessage: string;
  nested?: NestedValidationResult[];
  replacements?: Record<string, string>;
};

export type ValidationResult = true | FailedValidationResult;

export type NestedValidationResult =
  | true
  | (FailedValidationResult & {
      path: string | number | symbol;
    });

export type InferObject<T extends ObjectSchema<any>> =
  T extends ObjectSchema<infer K>
    ? {
        [J in keyof K]: InferSchema<K[J]>;
      }
    : never;

export type InferArray<T extends ArraySchema<any>> =
  T extends ArraySchema<infer K> ? InferSchema<K>[] : never;

export type InferSchema<T> = T extends StringSchema
  ? string
  : T extends DateSchema
    ? Date
    : T extends ArraySchema<any>
      ? InferArray<T>
      : T extends ObjectSchema<any>
        ? InferObject<T>
        : never;
