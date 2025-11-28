import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import {
  CheckIcon,
  ChevronDownIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { FieldWrapper } from "./FieldWrapper";

export interface SelectOption {
  label: string;
  value: string;
}

interface ComboboxProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  disabled?: boolean;
}

// --- ESTILOS CORRIGIDOS ---
const styles = {
  command: "flex h-full w-full flex-col overflow-hidden rounded-md bg-white",
  input:
    "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500",
  list: "max-h-[300px] overflow-y-auto overflow-x-hidden p-1",
  // CORREÇÃO AQUI:
  // 1. Removi regras de opacidade para evitar o visual "fantasma".
  // 2. Mudei para cinza (gray-100) e preto (text-gray-900) para garantir contraste.
  // 3. Adicionei 'aria-selected' além de 'data-selected' para garantir compatibilidade.
  item: cn(
    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
    // Cor padrão do texto
    "text-gray-900",
    // Estilo quando o item está FOCADO/SELECIONADO (mouse over ou setas)
    "data-[selected=true]:bg-gray-100 data-[selected=true]:text-black",
    "aria-selected:bg-gray-100 aria-selected:text-black" // Fallback para algumas versões
  ),
};

export const Combobox = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  error,
  disabled,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <FieldWrapper label={label} error={error}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <div
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors cursor-pointer",
              "bg-white border-gray-300 hover:bg-gray-50",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              error && "border-red-500 focus:ring-red-500",
              disabled && "cursor-not-allowed opacity-50 bg-gray-100"
            )}
          >
            <span className={cn("truncate", !value && "text-gray-400")}>
              {selectedLabel || placeholder}
            </span>

            <div className="flex items-center gap-2">
              {value && !disabled && (
                <div
                  role="button"
                  onClick={handleClear}
                  className="rounded-full p-0.5 hover:bg-gray-200 text-gray-500 transition-colors z-10"
                >
                  <Cross2Icon className="h-4 w-4" />
                </div>
              )}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[200px] rounded-md border border-gray-200 bg-white shadow-md p-0"
            align="start"
            sideOffset={5}
            // Importante: evita conflito de foco em telas sensíveis ao toque
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command className={styles.command} shouldFilter={true}>
              <div className="flex items-center border-b px-3">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                  placeholder={searchPlaceholder}
                  className={styles.input}
                />
              </div>

              <Command.List className={styles.list}>
                <Command.Empty className="py-6 text-center text-sm text-gray-500">
                  Nenhum resultado.
                </Command.Empty>

                <Command.Group>
                  {options.map((option) => (
                    <Command.Item
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        console.log("Clicou em:", option.label); // Debug
                        onChange(option.value === value ? "" : option.value);
                        setOpen(false);
                      }}
                      className={styles.item}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </FieldWrapper>
  );
};

// --- Exemplo ---
export const ComboboxExample = () => {
  const [cargo, setCargo] = useState("");
  const [framework, setFramework] = useState("");

  // Lista maior para demonstrar o poder da busca/filtro
  const cargosOptions = [
    { label: "Desenvolvedor Frontend", value: "front" },
    { label: "Desenvolvedor Backend", value: "back" },
    { label: "Fullstack Developer", value: "full" },
    { label: "DevOps Engineer", value: "devops" },
    { label: "Product Owner", value: "po" },
    { label: "UI/UX Designer", value: "design" },
    { label: "QA / Tester", value: "qa" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto p-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Exemplo Combobox (Command)</h2>
        <p className="text-xs text-gray-500">
          Agora com <strong>busca</strong>, <strong>filtro</strong> e limpeza
          nativa.
        </p>
      </div>

      {/* 1. Uso Básico (com lista maior) */}
      <Combobox
        label="Selecione seu Cargo"
        value={cargo}
        onChange={setCargo}
        options={cargosOptions}
        placeholder="Selecione um cargo..."
        searchPlaceholder="Buscar cargo..." // Nova prop opcional
      />

      {/* Mostrando o valor selecionado para debug */}
      <div className="text-xs p-2 bg-gray-100 rounded border">
        Valor selecionado: <strong>{cargo || "(vazio)"}</strong>
      </div>

      <hr className="border-gray-200" />

      {/* 2. Com Erro e Lista Pequena */}
      <Combobox
        label="Framework Favorito"
        value={framework}
        onChange={setFramework}
        error={!framework ? "Este campo é obrigatório" : undefined}
        placeholder="Escolha..."
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ]}
      />

      {/* 3. Estado Desabilitado */}
      <Combobox
        label="Departamento (Desabilitado)"
        value="ti"
        disabled
        onChange={() => {}}
        options={[{ label: "Tecnologia da Informação", value: "ti" }]}
      />
    </div>
  );
};
