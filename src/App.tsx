import { useState } from "react";
import "./App.css";
import { Button, ButtonExample } from "./components/atoms/Button";
import { ButtonGroup, GroupExample } from "./components/molecules/ButtonGroup";
import { TextAreaFieldExample } from "./components/molecules/TextAreaField";
import { TextFieldExample } from "./components/molecules/TextField";
import { UserRegistrationForm } from "./components/organisms/UserRegistrationForm";
import { cn } from "./lib/utils";
import { ComboboxExamples } from "./components/molecules/Combobox";

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
      <div className="max-w-4xl mx-auto space-y-8">
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
                <ComponentCard title="Text Field">
                  <TextFieldExample />
                </ComponentCard>

                <ComponentCard title="Buttons">
                  <ButtonExample />
                </ComponentCard>

                <ComponentCard title="Button Group" className="">
                  <GroupExample />
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
