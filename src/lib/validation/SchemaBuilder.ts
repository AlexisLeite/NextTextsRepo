import { BasicSchema } from ".";
import { ArraySchema } from "./ArraySchema";
import { DateSchema } from "./DateSchema";
import { ObjectSchema } from "./ObjectSchema";
import { StringSchema } from "./StringSchema";
import { BasicSchemaParameters } from "./types";

export class SchemaBuilder {
  array<T extends BasicSchema>(childrenSchema: T) {
    return new ArraySchema<T>(childrenSchema);
  }

  date(params?: BasicSchemaParameters) {
    return new DateSchema(params);
  }

  object<S extends Record<string, BasicSchema>>(schema: S) {
    return new ObjectSchema(schema);
  }

  string(params?: BasicSchemaParameters) {
    return new StringSchema(params);
  }
}
