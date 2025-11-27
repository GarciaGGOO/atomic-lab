import type { LabelHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Label = ({
  className,
  required,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) => {
  return (
    <label
      className={cn(
        "text-xs font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};
