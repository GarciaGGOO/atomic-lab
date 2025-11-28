import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export interface ComboboxTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasError?: boolean;
  isOpen?: boolean;
  placeholder?: string;
  displayValue?: string;
}

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(
  (
    {
      className,
      hasError,
      isOpen,
      placeholder = "Selecione...",
      displayValue,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        className={cn(
          // Layout e tipografia base
          "flex w-full items-center justify-between rounded-md border px-2 py-1.5 text-sm bg-white",
          // Cores de borda e texto
          "border-gray-300 text-gray-900",
          // Placeholder
          !displayValue && "text-gray-400",
          // Estados de foco (Anel azul)
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          // Estado Disabled
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-500",
          // Estado de Erro (Borda vermelha)
          hasError && "border-red-500 focus:ring-red-500",
          // Cursor
          "cursor-pointer",
          className
        )}
        {...props}
      >
        <span className="truncate">{displayValue || placeholder}</span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    );
  }
);

ComboboxTrigger.displayName = "ComboboxTrigger";
