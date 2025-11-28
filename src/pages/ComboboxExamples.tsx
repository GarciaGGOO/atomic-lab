import { useState } from "react";
import { Combobox } from "../components/organisms/Combobox";

// Exemplo de opções
const countries = [
  { value: "br", label: "Brasil" },
  { value: "mx", label: "México" },
  { value: "us", label: "Estados Unidos" },
  { value: "ar", label: "Argentina" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colômbia" },
  { value: "pe", label: "Peru" },
  { value: "uy", label: "Uruguai" },
  { value: "py", label: "Paraguai" },
  { value: "ve", label: "Venezuela", disabled: true },
];

const tags = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "nodejs", label: "Node.js" },
  { value: "nextjs", label: "Next.js" },
  { value: "prisma", label: "Prisma" },
  { value: "graphql", label: "GraphQL" },
  { value: "docker", label: "Docker" },
];

export function ComboboxExamples() {
  // Exemplo não controlado (single)
  const [country, setCountry] = useState<string>("");

  // Exemplo controlado (multiple)
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "react",
    "typescript",
  ]);

  return (
    <div className="max-w-md mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Combobox Examples</h1>

      {/* Seleção única */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Seleção Única</h2>
        <Combobox
          label="País"
          placeholder="Selecione um país"
          options={countries}
          value={country}
          onChange={(value) => setCountry(value as string)}
          searchPlaceholder="Buscar país..."
          required
        />
        <p className="text-sm text-gray-500">
          Valor selecionado: {country || "Nenhum"}
        </p>
      </div>

      {/* Seleção múltipla */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Seleção Múltipla
        </h2>
        <Combobox
          label="Tags"
          placeholder="Selecione as tags"
          options={tags}
          value={selectedTags}
          onChange={(value) => setSelectedTags(value as string[])}
          multiple
          searchPlaceholder="Buscar tags..."
        />
        <p className="text-sm text-gray-500">
          Tags selecionadas: {selectedTags.join(", ") || "Nenhuma"}
        </p>
      </div>

      {/* Com erro */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Com Erro</h2>
        <Combobox
          label="Categoria"
          placeholder="Selecione uma categoria"
          options={[
            { value: "tech", label: "Tecnologia" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
          ]}
          error="Este campo é obrigatório"
          required
        />
      </div>

      {/* Desabilitado */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Desabilitado</h2>
        <Combobox
          label="Status"
          placeholder="Selecione o status"
          options={[
            { value: "active", label: "Ativo" },
            { value: "inactive", label: "Inativo" },
          ]}
          defaultValue="active"
          disabled
        />
      </div>

      {/* Sem busca */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Sem Campo de Busca
        </h2>
        <Combobox
          label="Prioridade"
          placeholder="Selecione a prioridade"
          options={[
            { value: "low", label: "Baixa" },
            { value: "medium", label: "Média" },
            { value: "high", label: "Alta" },
            { value: "urgent", label: "Urgente" },
          ]}
          searchable={false}
        />
      </div>

      {/* Não limpa */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Sem Botão Limpar
        </h2>
        <Combobox
          label="Obrigatório"
          placeholder="Campo obrigatório"
          options={[
            { value: "opt1", label: "Opção 1" },
            { value: "opt2", label: "Opção 2" },
            { value: "opt3", label: "Opção 3" },
          ]}
          defaultValue="opt1"
          clearable={false}
        />
      </div>
    </div>
  );
}

// =========================================
// INSTRUÇÕES DE USO
// =========================================
/*

1. INSTALAÇÃO DE DEPENDÊNCIAS:
   npm install lucide-react clsx tailwind-merge

2. IMPORTAÇÃO:
   import { Combobox } from "@/components/combobox";

3. USO BÁSICO (Single Select):
   <Combobox
     label="País"
     options={[
       { value: "br", label: "Brasil" },
       { value: "mx", label: "México" },
     ]}
     value={country}
     onChange={setCountry}
   />

4. USO COM MÚLTIPLA SELEÇÃO:
   <Combobox
     label="Tags"
     options={tags}
     value={selectedTags}
     onChange={setSelectedTags}
     multiple
   />

5. PROPS DISPONÍVEIS:
   - options: Array<{ value: string, label: string, disabled?: boolean }>
   - value / defaultValue: string | string[]
   - onChange: (value: string | string[]) => void
   - multiple: boolean (default: false)
   - searchable: boolean (default: true)
   - clearable: boolean (default: true)
   - disabled: boolean (default: false)
   - closeOnSelect: boolean (default: !multiple)
   - label: string
   - placeholder: string
   - searchPlaceholder: string
   - emptyMessage: string
   - error: string
   - required: boolean

6. NAVEGAÇÃO POR TECLADO:
   - Tab: Abre o dropdown / seleciona item highlighted
   - Enter/Space: Abre dropdown / seleciona item
   - ArrowDown/ArrowUp: Navega entre opções
   - Escape: Fecha o dropdown
   - Digite para filtrar (quando searchable=true)

7. ACESSIBILIDADE:
   - role="combobox" no trigger
   - role="listbox" na lista
   - role="option" nos itens
   - aria-expanded, aria-selected, aria-disabled
   - Suporte completo a teclado

*/
