import { forwardRef, useId } from "react";
import { Input, type InputProps } from "../atoms/Input";
import { FieldWrapper } from "./FieldWrapper";
import { cn } from "../../lib/utils";
import { Search } from "lucide-react";

interface TextFieldProps extends InputProps {
  label?: string;
  error?: string;
  StartIcon?: React.ElementType;
  EndAdornment?: React.ReactNode;
  autoComplete?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      id,
      name,
      StartIcon,
      EndAdornment,
      className,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <FieldWrapper
        label={label}
        error={error}
        required={props.required}
        htmlFor={inputId}
      >
        <div className="relative flex items-center">
          {StartIcon && (
            <div className="absolute left-2 text-gray-500 pointer-events-none">
              <StartIcon className="size-5" />
            </div>
          )}

          <Input
            ref={ref}
            id={inputId}
            name={name}
            hasError={!!error}
            autoComplete={autoComplete}
            {...props}
            className={cn(
              StartIcon && "pl-8",
              EndAdornment && "pr-8",
              className
            )}
          />

          {EndAdornment && (
            <div className="absolute right-2 flex items-center text-gray-500">
              {EndAdornment}
            </div>
          )}
        </div>
      </FieldWrapper>
    );
  }
);
TextField.displayName = "TextField";

export const TextFieldExample = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Simples */}
      <TextField label="Nome Completo" placeholder="Digite seu nome..." />

      {/* 2. Com Erro */}
      <TextField
        label="E-mail"
        defaultValue="email@invalido"
        error="Por favor, insira um e-mail válido."
      />

      {/* 3. Desabilitado */}
      <TextField
        label="ID do Sistema (Bloqueado)"
        defaultValue="USER_12345"
        disabled
      />

      {/* 4. Senha */}
      <TextField label="Senha" type="password" placeholder="******" />

      {/* 5. Com Ícone Inicial */}
      <TextField label="Busca" placeholder="Pesquisar..." StartIcon={Search} />
    </div>
  );
};
