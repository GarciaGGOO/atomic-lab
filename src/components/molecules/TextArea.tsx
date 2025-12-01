import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { FieldWrapper } from "./FieldWrapper";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <FieldWrapper
        label={label}
        error={error}
        required={props.required}
        htmlFor={inputId}
      >
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "flex w-full min-h-[80px] rounded-md border px-2 py-1.5 text-sm bg-white",
            "border-gray-300 placeholder:text-gray-400 text-gray-900",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-500",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
TextArea.displayName = "TextAreaField";

export const TextAreaFieldExample = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Simples */}
      <TextArea label="Biografia" placeholder="Conte um pouco sobre você..." />

      {/* 2. Com Erro */}
      <TextArea
        label="Descrição do Problema"
        defaultValue="O sistema não fun..."
        error="A descrição deve ter no mínimo 20 caracteres."
      />

      {/* 3. Desabilitado */}
      <TextArea
        label="Feedback (Encerrado)"
        defaultValue="Este chamado já foi fechado e não aceita novos comentários."
        disabled
      />

      {/* 4. Controle de linhas (rows) e resize */}
      <TextArea
        label="Observações Adicionais"
        placeholder="Digite aqui..."
        rows={5}
        className="resize-none"
      />
    </div>
  );
};
