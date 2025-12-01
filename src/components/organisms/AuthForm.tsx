import { useState, type FormEvent } from "react";
import { Button } from "../atoms/Button";
import { PasswordField } from "../molecules/PasswordField";
import { TextField } from "../molecules/TextField";
import { ButtonGroup } from "../molecules/ButtonGroup";

type AuthMode = "login" | "register";

export const AuthForm = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleModeSwitch = (mode: AuthMode) => {
    setAuthMode(mode);
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (authMode === "register" && !formData.name.trim())
      newErrors.name = "Nome obrigatório.";
    if (!formData.email.includes("@")) newErrors.email = "E-mail inválido.";
    if (formData.password.length < 6)
      newErrors.password = "Mínimo 6 caracteres.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      alert(JSON.stringify(formData, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <ButtonGroup>
        <Button
          variant={authMode === "login" ? "primary" : "secondary"}
          onClick={() => handleModeSwitch("login")}
        >
          Entrar
        </Button>
        <Button
          variant={authMode === "register" ? "primary" : "secondary"}
          onClick={() => handleModeSwitch("register")}
        >
          Criar Conta
        </Button>
      </ButtonGroup>

      <form
        onSubmit={handleSubmit}
        key={authMode}
        className="w-full flex flex-col gap-5"
      >
        <div className="text-start">
          <h2 className="text-xl font-bold text-gray-900">
            {authMode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {authMode === "register" && (
            <TextField
              name="register_fullname"
              id="register-fullname"
              label="Nome Completo"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              autoComplete="name"
            />
          )}

          <TextField
            name={authMode === "login" ? "email" : "register_email"}
            id={authMode === "login" ? "login-email" : "register-email"}
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            autoComplete={authMode === "login" ? "username" : "email"}
          />

          <PasswordField
            label="Senha"
            name={authMode === "login" ? "password" : "new_password"}
            id={
              authMode === "login" ? "current-password" : "new-password-field"
            }
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            autoComplete={
              authMode === "login" ? "current-password" : "new-password"
            }
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading
            ? "Carregando..."
            : authMode === "login"
            ? "Acessar Plataforma"
            : "Confirmar Cadastro"}
        </Button>
      </form>
    </div>
  );
};
