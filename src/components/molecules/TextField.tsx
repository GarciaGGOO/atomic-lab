import { forwardRef, useId } from "react";
import { Input, type InputProps } from "../atoms/Input";
import { FieldWrapper } from "./FieldWrapper";

interface TextFieldProps extends InputProps {
  label?: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <FieldWrapper
        label={label}
        error={error}
        required={props.required}
        htmlFor={inputId}
      >
        <Input ref={ref} id={inputId} hasError={!!error} {...props} />
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
    </div>
  );
};
