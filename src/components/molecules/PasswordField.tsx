// PasswordField.tsx
import { useState } from "react";
import { TextField } from "./TextField"; // Importe seu componente
import { Eye, EyeOff, Lock } from "lucide-react"; // Exemplo usando biblioteca de ícones

// Omitimos 'type' pois será controlado internamente
interface PasswordFieldProps
  extends Omit<React.ComponentProps<typeof TextField>, "type"> {}

export const PasswordField = ({ ...props }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      {...props}
      id="password"
      name="password"
      // Alterna o tipo do input
      type={showPassword ? "text" : "password"}
      // Injeta o botão no final do input
      EndAdornment={
        <button
          type="button" // Importante para não submeter formulários
          onClick={toggleVisibility}
          className="focus:outline-none hover:text-gray-700"
          tabIndex={-1} // Opcional: para pular o tab no ícone
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
};

PasswordField.displayName = "PasswordField";

export const PasswordFieldExample = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Simples */}
      <PasswordField label="Senha" placeholder="Digite sua senha" />

      {/* 2. Com erro */}
      <PasswordField
        label="Senha"
        placeholder="Digite sua senha"
        error="Senha inválida"
      />

      {/* 3. Com ícone inicial */}
      <PasswordField
        label="Senha"
        placeholder="Digite sua senha"
        StartIcon={Lock} // Apenas um exemplo, use um ícone apropriado
      />
    </div>
  );
};
