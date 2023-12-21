import { useState } from "react";

export type UseInputProps<T> = {
  value: T;
  emptyValue: T;
  validateError?: (value: T) => [boolean, string?];
  validateSuccess?: (value: T) => [boolean, string?];
  compareEquality?: boolean;
};

export type UseInputReturnType<T> = {
  value: T;
  onChange: (value: T) => void;
  hasChanged: boolean;
  hasError: boolean;
  errorMsg: string | undefined;
  onClear: () => void;
} & Pick<UseInputProps<T>, "validateError" | "validateSuccess">;

export const useInput = <T>({
  value: initialValue,
  validateError,
  compareEquality,
  emptyValue,
}: UseInputProps<T>): UseInputReturnType<T> => {
  const [value, setValue] = useState(initialValue);
  const [hasChanged, setHasChanged] = useState(false);
  const [error, setError] = useState<[boolean, string?]>(
    () => validateError?.(value) || [false]
  );
  const [hasError, errorMsg] = error;

  const onChange = (value: T): void => {
    setHasChanged(
      !(
        compareEquality &&
        JSON.stringify(value) === JSON.stringify(initialValue)
      )
    );
    setValue(value);
    setError(validateError?.(value) || [false]);
  };

  const onClear = () => {
    onChange(emptyValue !== undefined ? emptyValue : initialValue);
  };

  return {
    value,
    onChange,
    hasChanged,
    hasError,
    errorMsg,
    onClear,
  };
};
