/**
 * # Validation messages
 *
 * Every validation instance will return true if validated or a string message on the contrary.
 *
 * The string error messages contain some special placeholders that must be replaced by the correct
 * value depending on the context.
 *
 * Placeholders:
 *
 * - {{field_label}}: Must be replaced with the field label.
 * - {{max}}: Must be replaced with the maximum value.
 * - {{min}}: Must be replaced with the minimum value.
 */

export const defaultMessages = {
  array: "{{field_label}} must be an array",
  arrayMax: "{{field_label}} must be have at most {{max}} elements.",
  arrayMin: "{{field_label}} must be have at least {{min}} elements.",
  arrayChildFailed:
    "At least one child of {{field_label}} failed on validation",
  date: "{{field_label}} must be of type date",
  dateMax: "{{field_label}} must be at most {{max}}",
  dateMin: "{{field_label}} must be at least {{min}}",
  object: "{{field_label}} must be an object",
  string: "{{field_label}} must be of type string",
  stringMax: "{{field_label}} must be at most {{max}} characters long.",
  stringMin: "{{field_label}} must be at least {{min}} characters long.",
  required: "{{field_label}} is required.",
};
