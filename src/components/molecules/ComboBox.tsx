import { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

import { ComboboxTrigger } from "../atoms/ComboboxTrigger";
import { Popover } from "../atoms/Popover";
import { FieldWrapper } from "./FieldWrapper";
import { ComboboxContent } from "./ComboboxContent";
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
      required,
      clearable,
      onChange,
      multiple = false,
      searchable = true,
      disabled = false,
      closeOnSelect,
      label,
      placeholder = "Selecione...",
      searchPlaceholder = "Buscar...",
      emptyMessage = "Nenhum resultado encontrado",
      error,
      className,
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

    const canClear = clearable ?? !required;

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
    const showClearButton = canClear && selectedValues.length > 0 && !disabled;

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
                "absolute right-2 top-1/2 -translate-y-1/2",
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

export function ComboboxExamples() {
  const countries = [
    { value: "br", label: "Brasil" },
    { value: "mx", label: "México" },
    { value: "us", label: "Estados Unidos" },
    { value: "ar", label: "Argentina" },
    { value: "cl", label: "Chile" },
    { value: "co", label: "Colômbia" },
    { value: "pe", label: "Peru" },
    { value: "uy", label: "Uruguai" },
    { value: "py", label: "Paraguai" },
    { value: "ve", label: "Venezuela", disabled: true },
  ];

  const tags = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "nodejs", label: "Node.js" },
    { value: "nextjs", label: "Next.js" },
    { value: "prisma", label: "Prisma" },
    { value: "graphql", label: "GraphQL" },
    { value: "docker", label: "Docker" },
  ];

  // Exemplo não controlado (single)
  const [country, setCountry] = useState<string>("");

  // Exemplo controlado (multiple)
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "react",
    "typescript",
  ]);

  return (
    <div className="max-w-md mx-auto p-8 space-y-8">
      {/* Seleção única */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Seleção Única</h2>
        <Combobox
          label="País"
          placeholder="Selecione um país"
          options={countries}
          value={country}
          onChange={(value) => setCountry(value as string)}
          searchPlaceholder="Buscar país..."
          required
        />
        <p className="text-sm text-gray-500">
          Valor selecionado: {country || "Nenhum"}
        </p>
      </div>

      {/* Seleção múltipla */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Seleção Múltipla
        </h2>
        <Combobox
          label="Tags"
          placeholder="Selecione as tags"
          options={tags}
          value={selectedTags}
          onChange={(value) => setSelectedTags(value as string[])}
          multiple
          searchPlaceholder="Buscar tags..."
        />
        <p className="text-sm text-gray-500">
          Tags selecionadas: {selectedTags.join(", ") || "Nenhuma"}
        </p>
      </div>

      {/* Com erro */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Com Erro</h2>
        <Combobox
          label="Categoria"
          placeholder="Selecione uma categoria"
          options={[
            { value: "tech", label: "Tecnologia" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
          ]}
          error="Este campo é obrigatório"
          required
        />
      </div>

      {/* Desabilitado */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Desabilitado</h2>
        <Combobox
          label="Status"
          placeholder="Selecione o status"
          options={[
            { value: "active", label: "Ativo" },
            { value: "inactive", label: "Inativo" },
          ]}
          defaultValue="active"
          disabled
        />
      </div>

      {/* Sem busca */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Sem Campo de Busca
        </h2>
        <Combobox
          label="Prioridade"
          placeholder="Selecione a prioridade"
          options={[
            { value: "low", label: "Baixa" },
            { value: "medium", label: "Média" },
            { value: "high", label: "Alta" },
            { value: "urgent", label: "Urgente" },
          ]}
          searchable={false}
        />
      </div>

      {/* Não limpa */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Sem Botão Limpar
        </h2>
        <Combobox
          label="Obrigatório"
          placeholder="Campo obrigatório"
          options={[
            { value: "opt1", label: "Opção 1" },
            { value: "opt2", label: "Opção 2" },
            { value: "opt3", label: "Opção 3" },
          ]}
          defaultValue="opt1"
          required
        />
      </div>
    </div>
  );
}

// =========================================
// INSTRUÇÕES DE USO
// =========================================
/*

1. INSTALAÇÃO DE DEPENDÊNCIAS:
   npm install lucide-react clsx tailwind-merge

2. IMPORTAÇÃO:
   import { Combobox } from "@/components/combobox";

3. USO BÁSICO (Single Select):
   <Combobox
     label="País"
     options={[
       { value: "br", label: "Brasil" },
       { value: "mx", label: "México" },
     ]}
     value={country}
     onChange={setCountry}
   />

4. USO COM MÚLTIPLA SELEÇÃO:
   <Combobox
     label="Tags"
     options={tags}
     value={selectedTags}
     onChange={setSelectedTags}
     multiple
   />

5. PROPS DISPONÍVEIS:
   - options: Array<{ value: string, label: string, disabled?: boolean }>
   - value / defaultValue: string | string[]
   - onChange: (value: string | string[]) => void
   - multiple: boolean (default: false)
   - searchable: boolean (default: true)
   - clearable: boolean (default: true)
   - disabled: boolean (default: false)
   - closeOnSelect: boolean (default: !multiple)
   - label: string
   - placeholder: string
   - searchPlaceholder: string
   - emptyMessage: string
   - error: string
   - required: boolean

6. NAVEGAÇÃO POR TECLADO:
   - Tab: Abre o dropdown / seleciona item highlighted
   - Enter/Space: Abre dropdown / seleciona item
   - ArrowDown/ArrowUp: Navega entre opções
   - Escape: Fecha o dropdown
   - Digite para filtrar (quando searchable=true)

7. ACESSIBILIDADE:
   - role="combobox" no trigger
   - role="listbox" na lista
   - role="option" nos itens
   - aria-expanded, aria-selected, aria-disabled
   - Suporte completo a teclado

*/
