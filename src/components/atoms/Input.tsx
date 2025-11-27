import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // Layout e tipografia base
          "flex w-full rounded-md border px-2 py-1.5 text-sm bg-white",
          // Cores de borda e texto
          "border-gray-300 placeholder:text-gray-400 text-gray-900",
          // Estados de foco (Anel azul)
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          // Estado Disabled
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-500",
          // Estado de Erro (Borda vermelha)
          hasError && "border-red-500 focus:ring-red-500",
          // Permite injetar classes extras
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
