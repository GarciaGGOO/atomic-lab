import { useState } from "react";
import "./App.css";
import { Button, ButtonExample } from "./components/atoms/Button";
import { ButtonGroup, GroupExample } from "./components/molecules/ButtonGroup";
import { TextAreaFieldExample } from "./components/molecules/TextArea";
import { TextFieldExample } from "./components/molecules/TextField";
import { UserProfileForm } from "./components/organisms/UserProfileForm";
import { cn } from "./lib/utils";
import { ComboboxExamples } from "./components/molecules/Combobox";
import { PasswordFieldExample } from "./components/molecules/PasswordField";
import { AuthForm } from "./components/organisms/AuthForm";

function App() {
  const showLab = import.meta.env.VITE_SHOW_LAB === "true";
  const [aba, setAba] = useState<"lab" | "gallery" | "forms">(
    showLab ? "lab" : "gallery"
  );

  return (
    <div
      className={cn(
        "min-h-screen p-4 md:p-8 transition-colors duration-300",
        aba === "lab"
          ? "bg-slate-950 text-slate-200"
          : "bg-gray-50 text-slate-800"
      )}
    >
      <div className="max-w-300 mx-auto space-y-8">
        <div className="flex flex-col items-center gap-6">
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight transition-colors duration-300",
              aba === "lab" ? "text-slate-100" : "text-slate-900"
            )}
          >
            Design System Showcase
          </h1>
          <div
            className={cn(
              "p-1.5 rounded-lg shadow-sm border transition-colors duration-300",
              aba === "lab"
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-200"
            )}
          >
            <ButtonGroup>
              {showLab && (
                <Button
                  variant={aba === "lab" ? "primary" : "secondary"}
                  onClick={() => setAba("lab")}
                >
                  Laboratório
                </Button>
              )}
              <Button
                variant={aba === "gallery" ? "primary" : "secondary"}
                onClick={() => setAba("gallery")}
              >
                Galeria de Componentes
              </Button>
              <Button
                variant={aba === "forms" ? "primary" : "secondary"}
                onClick={() => setAba("forms")}
              >
                Formulários
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <main
          className={cn(
            "rounded-2xl shadow-sm border p-6 md:p-10 min-h-[600px] transition-colors duration-300",
            aba === "lab"
              ? "bg-slate-950 border-slate-800 text-slate-200"
              : "bg-white border-gray-200"
          )}
        >
          {aba === "lab" && (
            <div className="space-y-6">
              <div
                className={cn(
                  "border-b pb-4 mb-6",
                  aba === "lab" ? "border-slate-800" : "border-gray-200"
                )}
              >
                <h2
                  className={cn(
                    "text-xl font-semibold",
                    aba === "lab" ? "text-slate-100" : "text-slate-700"
                  )}
                >
                  Componentes Atômicos & Moleculares
                </h2>
                <p
                  className={cn(
                    "text-sm",
                    aba === "lab" ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  laboratório de experimentação com os componentes.
                </p>

                <ComponentCard title="Combo Box" className=" bg-gray-50 mt-6">
                  <div className="flex flex-row">
                    <ComboboxExamples />
                  </div>
                </ComponentCard>
              </div>
            </div>
          )}

          {aba === "gallery" && (
            <div className="space-y-6">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-semibold text-slate-700">
                  Componentes Atômicos & Moleculares
                </h2>
                <p className="text-slate-500 text-sm">
                  Visualização individual dos elementos da interface.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ComponentCard title="Buttons">
                  <ButtonExample />
                </ComponentCard>

                <ComponentCard title="Button Group" className="">
                  <GroupExample />
                </ComponentCard>

                <ComponentCard title="Text Field">
                  <TextFieldExample />
                </ComponentCard>

                <ComponentCard title="Password Field">
                  <PasswordFieldExample />
                </ComponentCard>

                <ComponentCard title="Text Area">
                  <TextAreaFieldExample />
                </ComponentCard>

                <ComponentCard title="Combo Box">
                  <ComboboxExamples />
                </ComponentCard>
              </div>
            </div>
          )}

          {aba === "forms" && (
            <div className="w-full max-w-5xl mx-auto py-10 px-4">
              {/* Cabeçalho da Seção */}
              <div className="mb-12 text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Galeria de Formulários
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                  Exemplos de organismos de formulário prontos para uso.
                </p>
              </div>

              {/* Lista de Cards */}
              <div className="flex flex-col gap-16">
                {/* 1. Card do AuthForm */}
                <ComponentCard
                  title="Autenticação e Acesso"
                  description="Componente unificado para Login e Criação de Conta. Inclui validação de senha, toggle de visibilidade e gerenciamento de estado entre abas."
                  componentName="AuthForm"
                >
                  <AuthForm />
                </ComponentCard>

                {/* 2. Card do UserProfileForm */}
                <ComponentCard
                  title="Cadastro de Usuário"
                  description="Formulário extenso para coleta de dados cadastrais. Ideal para onboarding ou edição de perfil."
                  componentName="UserProfileForm"
                  isFullWidth={true}
                >
                  <div className="flex justify-center items-center py-12 px-6">
                    <UserProfileForm />
                  </div>
                </ComponentCard>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface ComponentCardProps {
  title: string;
  description?: string;
  componentName?: string; // Ex: "UserRegistrationForm"
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean; // Se false (padrão), centraliza e limita largura
}

export function ComponentCard({
  title,
  description,
  componentName,
  children,
  className = "",
  isFullWidth = false,
}: ComponentCardProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* --- Cabeçalho do Card --- */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 px-1">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && (
            <p className="text-sm text-slate-500 max-w-lg">{description}</p>
          )}
        </div>

        {/* A Badge Roxa que você gostou */}
        {componentName && (
          <div className="shrink-0">
            <span className="inline-block px-2.5 py-1 bg-purple-50 text-purple-700 text-[11px] font-mono rounded-md border border-purple-100 select-all">
              {`<${componentName} />`}
            </span>
          </div>
        )}
      </div>

      {/* --- Área de Preview (Canvas) --- */}
      <div
        className={`
          relative group overflow-hidden
          rounded-xl border border-gray-200 bg-slate-50/50
          transition-all duration-300 hover:border-indigo-200 hover:shadow-sm
          ${isFullWidth ? "" : "flex justify-center items-center py-12 px-6"}
        `}
      >
        {/* Padrão de fundo opcional (grid dots) para dar ar técnico */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* O Componente em si */}
        <div className={`relative w-full ${isFullWidth ? "" : "max-w-md"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default App;
