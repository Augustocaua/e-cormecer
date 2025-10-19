import { useState, useCallback } from "react";

type SanitizeFn = (v: string) => string;
type ValidateFn = (v: string) => boolean;

export function useSanitizedInput({
  sanitize,
  validate,
  initialValue = "",
}: {
  sanitize: SanitizeFn;
  validate: ValidateFn;
  initialValue?: string;
}) {
  const [value, setValue] = useState<string>(sanitize(initialValue));
  const [isValid, setIsValid] = useState<boolean>(validate(value));
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitize(e.target.value);
      setValue(sanitized);
      const valid = validate(sanitized);
      setIsValid(valid);
      setError(valid ? null : "Entrada inválida");
    },
    [sanitize, validate],
  );

  const onPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text");
      const sanitized = sanitize(pasted);
      setValue(sanitized);
      const valid = validate(sanitized);
      setIsValid(valid);
      setError(valid ? null : "Entrada inválida");
    },
    [sanitize, validate],
  );

  return { value, setValue, onChange, onPaste, isValid, error };
}