import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Search } from "lucide-react";

export interface ComboboxSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const ComboboxSearch = forwardRef<HTMLInputElement, ComboboxSearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center border-b border-gray-200 px-2">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          ref={ref}
          type="text"
          autoComplete="off"
          className={cn(
            // Layout e tipografia
            "flex-1 w-full bg-transparent px-2 py-2 text-sm",
            // Placeholder
            "placeholder:text-gray-400 text-gray-900",
            // Remove estilos de foco padrão
            "focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

ComboboxSearch.displayName = "ComboboxSearch";
