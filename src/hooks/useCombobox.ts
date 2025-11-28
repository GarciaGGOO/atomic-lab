import { useState, useCallback, useRef, useEffect, useMemo } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface UseComboboxProps {
  options: ComboboxOption[];
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  onSearchChange?: (search: string) => void;
  searchable?: boolean;
  closeOnSelect?: boolean;
}

export interface UseComboboxReturn {
  // Estado
  isOpen: boolean;
  search: string;
  highlightedIndex: number;
  selectedValues: string[];
  filteredOptions: ComboboxOption[];

  // Refs
  triggerRef: React.RefObject<HTMLButtonElement>;
  searchRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLDivElement>;

  // Actions
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearch: (value: string) => void;
  selectOption: (value: string) => void;
  clearSelection: () => void;
  highlightOption: (index: number) => void;

  // Handlers
  handleTriggerKeyDown: (e: React.KeyboardEvent) => void;
  handleSearchKeyDown: (e: React.KeyboardEvent) => void;
  handleOptionClick: (value: string) => void;

  // Helpers
  isSelected: (value: string) => boolean;
  getDisplayValue: () => string;
}

export function useCombobox({
  options,
  multiple = false,
  value,
  defaultValue,
  onChange,
  onSearchChange,
  searchable = true,
  closeOnSelect = !multiple,
}: UseComboboxProps): UseComboboxReturn {
  // Estado controlado vs não controlado
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    const initial = defaultValue ?? (multiple ? [] : "");
    return Array.isArray(initial) ? initial : initial ? [initial] : [];
  });

  const selectedValues = useMemo(() => {
    if (isControlled) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return internalValue;
  }, [isControlled, value, internalValue]);

  // Estado interno
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearchState] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Refs
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filtra opções baseado na busca
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const searchLower = search.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchLower)
    );
  }, [options, search]);

  // Reset highlight quando filteredOptions muda
  useEffect(() => {
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [filteredOptions.length]);

  // Foca no search quando abre
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      // Pequeno delay para garantir que o popover está renderizado
      setTimeout(() => searchRef.current?.focus(), 10);
    }
  }, [isOpen, searchable]);

  // Actions
  const open = useCallback(() => {
    setIsOpen(true);
    setSearchState("");
    setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [filteredOptions.length]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchState("");
    setHighlightedIndex(-1);
    // Retorna foco para o trigger
    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const setSearch = useCallback(
    (value: string) => {
      setSearchState(value);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  const selectOption = useCallback(
    (optionValue: string) => {
      const option = options.find((opt) => opt.value === optionValue);
      if (!option || option.disabled) return;

      let newValue: string[];

      if (multiple) {
        // Toggle para multiple
        if (selectedValues.includes(optionValue)) {
          newValue = selectedValues.filter((v) => v !== optionValue);
        } else {
          newValue = [...selectedValues, optionValue];
        }
      } else {
        // Substitui para single
        newValue = [optionValue];
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(multiple ? newValue : newValue[0] ?? "");

      if (closeOnSelect) {
        close();
      }
    },
    [
      options,
      multiple,
      selectedValues,
      isControlled,
      onChange,
      closeOnSelect,
      close,
    ]
  );

  const clearSelection = useCallback(() => {
    if (!isControlled) {
      setInternalValue([]);
    }
    onChange?.(multiple ? [] : "");
  }, [isControlled, onChange, multiple]);

  const highlightOption = useCallback((index: number) => {
    setHighlightedIndex(index);
  }, []);

  // Helpers
  const isSelected = useCallback(
    (optionValue: string) => selectedValues.includes(optionValue),
    [selectedValues]
  );

  const getDisplayValue = useCallback(() => {
    if (selectedValues.length === 0) return "";

    if (multiple) {
      const selectedLabels = selectedValues
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean);

      if (selectedLabels.length === 1) {
        return selectedLabels[0]!;
      }
      return `${selectedLabels.length} selecionados`;
    }

    return options.find((opt) => opt.value === selectedValues[0])?.label ?? "";
  }, [selectedValues, options, multiple]);

  // Navegação por teclado
  const navigateOptions = useCallback(
    (direction: "up" | "down") => {
      const enabledOptions = filteredOptions.filter((opt) => !opt.disabled);
      if (enabledOptions.length === 0) return;

      let newIndex = highlightedIndex;

      if (direction === "down") {
        newIndex = highlightedIndex < filteredOptions.length - 1
          ? highlightedIndex + 1
          : 0;
      } else {
        newIndex = highlightedIndex > 0
          ? highlightedIndex - 1
          : filteredOptions.length - 1;
      }

      // Pula opções disabled
      while (filteredOptions[newIndex]?.disabled) {
        if (direction === "down") {
          newIndex = newIndex < filteredOptions.length - 1 ? newIndex + 1 : 0;
        } else {
          newIndex = newIndex > 0 ? newIndex - 1 : filteredOptions.length - 1;
        }
        // Evita loop infinito se todas estão disabled
        if (newIndex === highlightedIndex) break;
      }

      setHighlightedIndex(newIndex);

      // Scroll into view
      const optionEl = listRef.current?.querySelector(
        `[data-index="${newIndex}"]`
      );
      optionEl?.scrollIntoView({ block: "nearest" });
    },
    [filteredOptions, highlightedIndex]
  );

  // Keyboard Handlers
  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
          e.preventDefault();
          open();
          break;
        case "ArrowUp":
          e.preventDefault();
          open();
          // Vai para o último item
          setHighlightedIndex(filteredOptions.length - 1);
          break;
      }
    },
    [open, filteredOptions.length]
  );

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          navigateOptions("down");
          break;
        case "ArrowUp":
          e.preventDefault();
          navigateOptions("up");
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            selectOption(filteredOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "Tab":
          // Permite navegação natural com Tab
          if (!e.shiftKey && highlightedIndex >= 0) {
            e.preventDefault();
            selectOption(filteredOptions[highlightedIndex].value);
          } else {
            close();
          }
          break;
      }
    },
    [
      navigateOptions,
      highlightedIndex,
      filteredOptions,
      selectOption,
      close,
    ]
  );

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      selectOption(optionValue);
    },
    [selectOption]
  );

  return {
    // Estado
    isOpen,
    search,
    highlightedIndex,
    selectedValues,
    filteredOptions,

    // Refs
    triggerRef,
    searchRef,
    listRef,

    // Actions
    open,
    close,
    toggle,
    setSearch,
    selectOption,
    clearSelection,
    highlightOption,

    // Handlers
    handleTriggerKeyDown,
    handleSearchKeyDown,
    handleOptionClick,

    // Helpers
    isSelected,
    getDisplayValue,
  };
}
