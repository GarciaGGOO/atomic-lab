import { useState } from "react";
import "./App.css";
import { Button, ButtonExample } from "./components/atoms/Button";
import { ButtonGroup, GroupExample } from "./components/molecules/ButtonGroup";
import { ComboBoxExample } from "./components/molecules/ComboBox";
import { TextAreaFieldExample } from "./components/molecules/TextAreaField";
import { TextFieldExample } from "./components/molecules/TextField";
import { UserRegistrationForm } from "./components/organisms/UserRegistrationForm";

function App() {
  const [aba, setAba] = useState<"gallery" | "forms">("gallery");

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 p-4 md:p-8">
      {/* Container Principal Centralizado */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Cabeçalho e Navegação */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Design System Showcase
          </h1>

          <div className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-200">
            <ButtonGroup>
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

        {/* Área de Conteúdo Principal */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 min-h-[600px]">
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

              {/* Grid Layout para os componentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <ComponentCard title="Text Field">
                  <TextFieldExample />
                </ComponentCard>

                <ComponentCard title="Text Area">
                  <TextAreaFieldExample />
                </ComponentCard>

                <ComponentCard title="Combo Box">
                  <ComboBoxExample />
                </ComponentCard>

                <ComponentCard title="Buttons">
                  <ButtonExample />
                </ComponentCard>

                <ComponentCard title="Button Group" className="md:col-span-2">
                  <GroupExample />
                </ComponentCard>
              </div>
            </div>
          )}

          {aba === "forms" && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full max-w-2xl">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Cadastro de Usuário
                  </h2>
                  <p className="text-slate-500">
                    Exemplo de organismo utilizando os componentes.
                  </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                  <UserRegistrationForm />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ComponentCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider pl-1">
        {title}
      </h3>
      <div className="p-6 rounded-xl border border-dashed border-gray-300 hover:border-indigo-300 transition-colors flex justify-center items-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export default App;
