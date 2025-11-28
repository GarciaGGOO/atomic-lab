import { forwardRef, useId } from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

import { ComboboxTrigger } from "../atoms/ComboboxTrigger";
import { Popover } from "../atoms/Popover";
import { FieldWrapper } from "../molecules/FieldWrapper";
import { ComboboxContent } from "../molecules/ComboboxContent";
import {
  useCombobox,
  type ComboboxOption as ComboboxOptionType,
} from "../../hooks/useCombobox";

export interface ComboboxProps {
  // Opções
  options: ComboboxOptionType[];

  // Valor (controlado ou não controlado)
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;

  // Configurações
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  closeOnSelect?: boolean;

  // Labels e textos
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  error?: string;

  // Estilo
  className?: string;
  required?: boolean;
  id?: string;

  // Callbacks
  onSearchChange?: (search: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      multiple = false,
      searchable = true,
      clearable = true,
      disabled = false,
      closeOnSelect,
      label,
      placeholder = "Selecione...",
      searchPlaceholder = "Buscar...",
      emptyMessage = "Nenhum resultado encontrado",
      error,
      className,
      required,
      id,
      onSearchChange,
      onOpenChange,
    },
    ref
  ) => {
    const generatedId = useId();
    const comboboxId = id || generatedId;

    const {
      isOpen,
      search,
      highlightedIndex,
      selectedValues,
      filteredOptions,
      triggerRef,
      searchRef,
      listRef,
      toggle,
      close,
      setSearch,
      handleTriggerKeyDown,
      handleSearchKeyDown,
      handleOptionClick,
      highlightOption,
      getDisplayValue,
      clearSelection,
    } = useCombobox({
      options,
      multiple,
      value,
      defaultValue,
      onChange,
      onSearchChange,
      searchable,
      closeOnSelect: closeOnSelect ?? !multiple,
    });

    // Notifica mudança de estado open
    const handleToggle = () => {
      toggle();
      onOpenChange?.(!isOpen);
    };

    const handleClose = () => {
      close();
      onOpenChange?.(false);
    };

    const displayValue = getDisplayValue();
    const showClearButton = clearable && selectedValues.length > 0 && !disabled;

    return (
      <FieldWrapper
        label={label}
        error={error}
        required={required}
        htmlFor={comboboxId}
        className={className}
      >
        <div className="relative">
          {/* Trigger */}
          <ComboboxTrigger
            ref={(node) => {
              // Merge refs
              (
                triggerRef as React.MutableRefObject<HTMLButtonElement | null>
              ).current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            id={comboboxId}
            isOpen={isOpen}
            hasError={!!error}
            disabled={disabled}
            placeholder={placeholder}
            displayValue={displayValue}
            onClick={handleToggle}
            onKeyDown={handleTriggerKeyDown}
            aria-labelledby={label ? `${comboboxId}-label` : undefined}
            className={cn(showClearButton && "pr-8")}
          />

          {/* Botão de limpar */}
          {showClearButton && (
            <button
              type="button"
              className={cn(
                "absolute right-8 top-1/2 -translate-y-1/2",
                "p-0.5 rounded-full",
                "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
                "focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              tabIndex={-1}
              aria-label="Limpar seleção"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Popover com conteúdo */}
          <Popover
            isOpen={isOpen}
            onClose={handleClose}
            triggerRef={triggerRef}
          >
            <ComboboxContent
              options={filteredOptions}
              highlightedIndex={highlightedIndex}
              selectedValues={selectedValues}
              multiple={multiple}
              showSearch={searchable}
              searchValue={search}
              searchPlaceholder={searchPlaceholder}
              emptyMessage={emptyMessage}
              onSearchChange={setSearch}
              onSearchKeyDown={handleSearchKeyDown}
              onOptionClick={handleOptionClick}
              onOptionHover={highlightOption}
              searchRef={searchRef}
              listRef={listRef}
            />
          </Popover>
        </div>
      </FieldWrapper>
    );
  }
);

Combobox.displayName = "Combobox";
