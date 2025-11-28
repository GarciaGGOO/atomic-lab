import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

export interface ComboboxOptionProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
  disabled?: boolean;
  showCheckbox?: boolean;
}

export const ComboboxOption = forwardRef<HTMLDivElement, ComboboxOptionProps>(
  (
    {
      className,
      value,
      label,
      isSelected,
      isHighlighted,
      disabled,
      showCheckbox = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-value={value}
        data-highlighted={isHighlighted}
        className={cn(
          // Layout base
          "relative flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer select-none",
          // Cores padrão
          "text-gray-900",
          // Estado highlighted (navegação por teclado/hover)
          isHighlighted && "bg-blue-50 text-blue-900",
          // Estado selecionado
          isSelected && "font-medium bg-gray-100/50",
          // Estado disabled
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Checkbox visual para multi-select */}
        {showCheckbox ? (
          <div
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
              isSelected
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300 bg-white"
            )}
          >
            {isSelected && <Check className="h-3 w-3" />}
          </div>
        ) : (
          isSelected && <Check className="h-4 w-4 text-blue-500 shrink-0" />
        )}
        <span className="truncate">{label}</span>
      </div>
    );
  }
);

ComboboxOption.displayName = "ComboboxOption";
