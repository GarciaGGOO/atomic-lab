import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import {
  ComboboxOption,
  type ComboboxOptionProps,
} from "../atoms/ComboboxOption";
import { ComboboxSearch } from "../atoms/ComboboxSearch";

export interface ComboboxContentProps extends HTMLAttributes<HTMLDivElement> {
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  highlightedIndex: number;
  selectedValues: string[];
  showSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  multiple?: boolean;
  onSearchChange?: (value: string) => void;
  onSearchKeyDown?: (e: React.KeyboardEvent) => void;
  onOptionClick?: (value: string) => void;
  onOptionHover?: (index: number) => void;
  searchRef?: React.RefObject<HTMLInputElement>;
  listRef?: React.RefObject<HTMLDivElement>;
}

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  (
    {
      className,
      options,
      highlightedIndex,
      selectedValues,
      showSearch = true,
      searchValue = "",
      searchPlaceholder = "Buscar...",
      emptyMessage = "Nenhum resultado encontrado",
      multiple = false,
      onSearchChange,
      onSearchKeyDown,
      onOptionClick,
      onOptionHover,
      searchRef,
      listRef,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {/* Campo de busca */}
        {showSearch && (
          <ComboboxSearch
            ref={searchRef}
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={onSearchKeyDown}
          />
        )}

        {/* Lista de opções */}
        <div
          ref={listRef}
          role="listbox"
          aria-multiselectable={multiple}
          className="max-h-60 overflow-y-auto py-1"
        >
          {options.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-gray-500">
              {emptyMessage}
            </div>
          ) : (
            options.map((option, index) => (
              <ComboboxOption
                key={option.value}
                data-index={index}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
                isSelected={selectedValues.includes(option.value)}
                isHighlighted={index === highlightedIndex}
                onClick={() => onOptionClick?.(option.value)}
                onMouseEnter={() => onOptionHover?.(index)}
                showCheckbox={multiple}
              />
            ))
          )}
        </div>

        {/* Footer com contagem para múltipla seleção */}
        {multiple && selectedValues.length > 0 && (
          <div className="border-t border-gray-200 px-2 py-1.5 text-xs text-gray-500">
            {selectedValues.length} item(s) selecionado(s)
          </div>
        )}
      </div>
    );
  }
);

ComboboxContent.displayName = "ComboboxContent";
