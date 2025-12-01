import { useState, type FormEvent } from "react";
import { User, MapPin, Phone, Link as LinkIcon, Save } from "lucide-react"; // Ícones para seções
import { Button } from "../atoms/Button";
import { TextArea } from "../molecules/TextArea";
import { TextField } from "../molecules/TextField";
import { Combobox } from "../molecules/Combobox";

export const UserProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Estado inicial simulando dados que viriam do banco
  const [formData, setFormData] = useState({
    fullName: "",
    socialName: "",
    birthDate: "",
    gender: "",
    email: "usuario@empresa.com", // Email geralmente vem preenchido
    phone: "",
    zipCode: "",
    address: "",
    number: "",
    city: "",
    state: "",
    linkedin: "",
    bio: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula salvamento
    setTimeout(() => {
      console.log("Dados Atualizados:", formData);
      alert("Perfil atualizado com sucesso!"); // Pode usar seu toast aqui
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-150 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* --- Cabeçalho --- */}
      <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-900">Meus Dados</h2>
        <p className="text-sm text-gray-500">
          Gerencie suas informações pessoais e de contato.
        </p>
      </div>

      <div className="p-8 flex flex-col gap-10">
        {/* === SEÇÃO 1: IDENTIDADE === */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
              <User size={18} className="text-blue-600" />
              <h3>Identidade</h3>
            </div>
            <p className="text-xs text-gray-500">
              Informações básicas de identificação.
            </p>
          </div>

          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <TextField
                label="Nome Civil Completo"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                autoComplete="name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Nome Social (Como prefere ser chamado)"
                value={formData.socialName}
                onChange={(e) =>
                  setFormData({ ...formData, socialName: e.target.value })
                }
                autoComplete="nickname"
              />
            </div>

            <div className="flex gap-4">
              <TextField
                label="Data de Nascimento"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                autoComplete="bday"
                required
              />
              <Combobox
                label="Gênero / Pronomes"
                placeholder="Selecione..."
                value={formData.gender}
                onChange={(val) =>
                  setFormData({ ...formData, gender: val as string })
                }
                options={[
                  { label: "Masculino (Ele/Dele)", value: "m" },
                  { label: "Feminino (Ela/Dela)", value: "f" },
                  { label: "Não-binário (Elu/Delu)", value: "nb" },
                  { label: "Prefiro não informar", value: "x" },
                ]}
              />
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* === SEÇÃO 2: CONTATO === */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
              <Phone size={18} className="text-blue-600" />
              <h3>Contato</h3>
            </div>
            <p className="text-xs text-gray-500">
              Canais para falarmos com você.
            </p>
          </div>

          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              label="E-mail Principal"
              type="email"
              value={formData.email}
              disabled
              className="bg-gray-50"
            />

            <TextField
              label="Celular / WhatsApp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              autoComplete="tel"
            />

            {/* Exemplo de Input com Ícone para Links */}
            <div className="md:col-span-2">
              <TextField
                label="Perfil do LinkedIn"
                placeholder="https://linkedin.com/in/seu-perfil"
                StartIcon={LinkIcon}
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* === SEÇÃO 3: ENDEREÇO === */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
              <MapPin size={18} className="text-blue-600" />
              <h3>Localização</h3>
            </div>
            <p className="text-xs text-gray-500">
              Endereço para correspondências.
            </p>
          </div>

          <div className="w-full md:w-3/4 grid grid-cols-6 gap-5">
            <div className="col-span-2">
              <TextField
                label="CEP"
                placeholder="00000-000"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                autoComplete="postal-code"
              />
            </div>

            {/* Ocupa o resto da linha (4 colunas) */}
            <div className="col-span-4">
              <TextField
                label="Endereço e Número"
                placeholder="Rua das Flores, 123"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                autoComplete="street-address"
              />
            </div>

            <div className="col-span-3">
              <TextField
                label="Cidade"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                autoComplete="address-level2"
              />
            </div>

            <div className="col-span-3">
              <Combobox
                label="Estado"
                value={formData.state}
                onChange={(val) =>
                  setFormData({ ...formData, state: val as string })
                }
                // Lista resumida para exemplo
                options={[
                  { label: "São Paulo", value: "SP" },
                  { label: "Rio de Janeiro", value: "RJ" },
                  { label: "Minas Gerais", value: "MG" },
                ]}
              />
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* === SEÇÃO 4: BIO === */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <h3 className="font-semibold text-gray-900">Sobre Você</h3>
          </div>
          <div className="w-full md:w-3/4">
            <TextArea
              label="Minibiografia"
              placeholder="Escreva um pouco sobre quem você é..."
              rows={4}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              Esta informação será exibida no seu perfil público.
            </p>
          </div>
        </section>
      </div>

      {/* --- Footer Fixo ou Bottom --- */}
      <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-end gap-3">
        <Button variant="secondary" type="button">
          Cancelar Alterações
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            "Salvando..."
          ) : (
            <>
              <Save size={16} />
              Salvar Perfil
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
