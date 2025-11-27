import React, { useId } from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { FieldWrapper } from "../atoms/FieldWrapper";

// Definindo o formato das opções
export interface SelectOption {
  label: string;
  value: string;
}

interface ComboBoxProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  error?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
}

export const ComboBox = ({
  label,
  options,
  placeholder,
  error,
  value,
  onChange,
  disabled,
  name,
  required,
}: ComboBoxProps) => {
  const generatedId = useId();
  const hasError = !!error;

  return (
    <FieldWrapper
      label={label}
      error={error}
      required={required}
      htmlFor={generatedId}
    >
      <Select.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
      >
        <Select.Trigger
          id={generatedId}
          className={cn(
            // Layout e tipografia base
            "flex justify-between items-center w-full rounded-md border px-2 py-1.5 text-sm bg-white",
            // Cores de borda e texto
            "border-gray-300 placeholder:text-gray-400 text-gray-900",
            // Estados de foco (Anel azul)
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            // Estado Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-500",
            // Cor do texto quando é placeholder
            "data-[placeholder]:text-gray-400 text-gray-900",
            // Estado de Erro
            hasError && "border-red-500 focus:ring-red-500"
          )}
        >
          <Select.Value placeholder={placeholder || "Selecione..."} />
          <Select.Icon>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md animate-in fade-in-80 zoom-in-95"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                    "focus:bg-blue-100 focus:text-blue-900",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Select.ItemIndicator>
                      <CheckIcon className="h-4 w-4 text-blue-600" />
                    </Select.ItemIndicator>
                  </span>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </FieldWrapper>
  );
};

// --- Exemplo ---
export const ComboBoxExample = () => {
  const [cargo, setCargo] = React.useState("");

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg bg-gray-50 border-dashed border-gray-300">
      <h3 className="font-bold text-gray-900">ComboBox (Keyboard Ready)</h3>

      <p className="text-xs text-gray-500 mb-2">
        Teste: Use <strong>Tab</strong> para focar, <strong>Setas</strong> para
        navegar e <strong>Enter</strong> para selecionar.
      </p>

      {/* 1. Uso Básico */}

      <ComboBox
        label="Selecione seu Cargo"
        value={cargo}
        onChange={setCargo}
        placeholder="Escolha uma opção..."
        options={[
          { label: "Desenvolvedor Frontend", value: "front" },
          { label: "Desenvolvedor Backend", value: "back" },
          { label: "Fullstack", value: "full" },
          { label: "DevOps", value: "devops" },
        ]}
      />

      {/* 2. Com Erro */}
      <ComboBox
        label="Estado"
        error="Campo obrigatório"
        onChange={() => {}}
        options={[]}
        placeholder="Selecione..."
      />
    </div>
  );
};
