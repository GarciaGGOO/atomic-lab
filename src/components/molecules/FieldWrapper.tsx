import type { ReactNode } from "react";
import { Label } from "../atoms/Label";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
}

export const FieldWrapper = ({
  label,
  error,
  children,
  htmlFor,
  required,
}: FieldWrapperProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-start w-full">
        {label && (
          <Label htmlFor={htmlFor} required={required}>
            {label}
          </Label>
        )}
      </div>

      <div className="">{children}</div>

      {error && (
        <div className="flex items-start justify-start text-left w-full">
          <span className="text-xs font-medium text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
};
