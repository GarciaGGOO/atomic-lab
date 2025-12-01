import { useState, type FormEvent } from "react";
import { Button } from "../atoms/Button";

import { TextArea } from "../molecules/TextArea";
import { TextField } from "../molecules/TextField";
import { Combobox } from "../molecules/Combobox";

export const UserRegistrationForm = () => {
  // 1. Estados do Formulário
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
  });

  // 2. Simulando uma validação simples
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "O nome é obrigatório.";
    if (!formData.email.includes("@"))
      newErrors.email = "Digite um e-mail válido.";
    if (!formData.role) newErrors.role = "Selecione um cargo.";
    if (formData.bio.length < 10)
      newErrors.bio = "Conte um pouco mais (mínimo 10 letras).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. Função de Submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    // Simulando chamada API
    setTimeout(() => {
      alert(JSON.stringify(formData, null, 2));
      setIsLoading(false);
      setErrors({});
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      {/* Cabeçalho */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Criar Nova Conta</h2>
        <p className="text-gray-500 text-sm mt-1">
          Preencha os dados abaixo para cadastrar o colaborador.
        </p>
      </div>

      {/* Grid para inputs lado a lado em telas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Nome Completo"
          placeholder="Ex: Guilherme Silva"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          disabled={isLoading}
          required
        />

        <TextField
          label="E-mail Corporativo"
          placeholder="nome@empresa.com"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          disabled={isLoading}
          required
        />
      </div>

      {/* Combobox ocupando largura total */}
      <Combobox
        label="Cargo / Função"
        placeholder="Selecione o nível..."
        value={formData.role}
        onChange={(value) =>
          setFormData({ ...formData, role: value as string })
        }
        error={errors.role}
        disabled={isLoading}
        options={[
          { label: "Estagiário", value: "intern" },
          { label: "Desenvolvedor Júnior", value: "junior" },
          { label: "Desenvolvedor Pleno", value: "mid" },
          { label: "Desenvolvedor Sênior", value: "senior" },
          { label: "Tech Lead", value: "lead" },
        ]}
        required
      />

      {/* TextArea para biografia */}
      <TextArea
        label="Sobre o Colaborador"
        placeholder="Descreva as principais habilidades e experiências..."
        rows={4}
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        error={errors.bio}
        disabled={isLoading}
        required
      />

      {/* Botões de Ação */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="secondary"
          disabled={isLoading}
          onClick={() => alert("Cancelado!")}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto min-w-[120px]"
        >
          {isLoading ? "Salvando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
};
