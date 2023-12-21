import { error, noError } from "./builders";
import { INTEGER_COMMA_SPACE_REGEX } from "./regex";

export const fuelValidation = (value: string) => {
  if (!value) return error("This field is required");
  if (!INTEGER_COMMA_SPACE_REGEX.test(value))
    return error(
      "Invalid format. Only integer numbers are allowed, separated by commas."
    );

  return noError();
};
