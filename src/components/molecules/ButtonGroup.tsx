import { useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/Button";
import { Info } from "lucide-react";

interface ButtonGroupProps {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const ButtonGroup = ({
  children,
  orientation = "horizontal",
  className,
}: ButtonGroupProps) => {
  return (
    <div
      className={cn(
        "inline-flex isolate", // isolate cria contexto de empilhamento para o z-index funcionar
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {/* A mágica acontece aqui: estamos injetando classes nos filhos (Buttons) 
        diretamente pelo pai usando css aninhado.
      */}
      <div
        className={cn(
          "contents shadow-sm rounded-md", // 'contents' faz essa div ser ignorada pelo layout, aplicando estilos direto nos filhos

          // --- ESTILOS GERAIS ---
          "[&>button]:shadow-none", // Remove sombra individual para usar a do grupo
          "[&>button]:ring-offset-0", // Ajuste fino para foco

          // --- ORIENTAÇÃO HORIZONTAL (Padrão) ---
          orientation === "horizontal" && [
            // O primeiro botão mantém cantos arredondados na esquerda
            "[&>button:first-child]:rounded-r-none",
            // O último botão mantém cantos arredondados na direita
            "[&>button:last-child]:rounded-l-none",
            // Botões do meio ficam quadrados
            "[&>button:not(:first-child):not(:last-child)]:rounded-none",
            // Margem negativa para sobrepor as bordas (evita borda dupla grossa)
            "[&>button:not(:first-child)]:-ml-px",
          ],

          // --- ORIENTAÇÃO VERTICAL ---
          orientation === "vertical" && [
            "w-min", // Garante que fique da largura do botão
            "[&>button]:w-full", // Botões ocupam toda largura
            "[&>button:first-child]:rounded-b-none",
            "[&>button:last-child]:rounded-t-none",
            "[&>button:not(:first-child):not(:last-child)]:rounded-none",
            "[&>button:not(:first-child)]:-mt-px",
          ],

          // --- ESTADO DE FOCO E HOVER (Z-Index) ---
          // Isso garante que a borda do botão focado/hover fique POR CIMA dos vizinhos
          "[&>button:hover]:z-10",
          "[&>button:focus]:z-10"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const GroupExample = () => {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  const [formats, setFormats] = useState<string[]>([]);

  const toggleFormat = (format: string) => {
    setFormats(
      (prev) =>
        prev.includes(format)
          ? prev.filter((f) => f !== format) // Remove se já existe
          : [...prev, format] // Adiciona se não existe
    );
  };
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  const toggleOrientation = () => {
    setOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal"
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg bg-gray-50 border-dashed border-gray-300">
      <h3 className="font-bold text-gray-900">GroupButton Gallery</h3>
      <Button
        onClick={toggleOrientation}
        className="mb-2"
        variant="secondary"
        size="sm"
      >
        Alternar Orientação (Atual: {orientation})
      </Button>
      <h3 className="text-sm font-bold border-t border-gray-300 pt-2">
        Tema (Radio Logic)
      </h3>

      <ButtonGroup orientation={orientation}>
        <Button
          variant={size === "sm" ? "primary" : "secondary"}
          onClick={() => setSize("sm")}
        >
          pequeno
        </Button>
        <Button
          variant={size === "md" ? "primary" : "secondary"}
          onClick={() => setSize("md")}
        >
          médio
        </Button>
        <Button
          variant={size === "lg" ? "primary" : "secondary"}
          onClick={() => setSize("lg")}
        >
          grande
        </Button>
      </ButtonGroup>
      <p className="text-xs text-gray-500">Selecionado: {size}</p>

      <h3 className="text-sm font-bold border-t border-gray-300 pt-2">
        Formatação (Checkbox Logic)
      </h3>
      <ButtonGroup orientation={orientation}>
        <Button
          variant={formats.includes("bold") ? "primary" : "secondary"}
          onClick={() => toggleFormat("bold")}
          className="font-bold"
          size={size}
        >
          B
        </Button>
        <Button
          variant={formats.includes("italic") ? "primary" : "secondary"}
          onClick={() => toggleFormat("italic")}
          className="italic"
          size={size}
        >
          I
        </Button>
        <Button
          variant={formats.includes("underline") ? "primary" : "secondary"}
          onClick={() => toggleFormat("underline")}
          className="underline"
          size={size}
        >
          U
        </Button>
      </ButtonGroup>

      <h3 className="text-sm font-bold border-t border-gray-300 pt-2">
        Toolbar (Ações)
      </h3>
      <ButtonGroup orientation={orientation}>
        <Button
          variant="secondary"
          onClick={() => alert("Salvou!")}
          size={size}
        >
          Salvar
        </Button>
        <Button
          variant="secondary"
          onClick={() => alert("Duplicou!")}
          size={size}
        >
          Duplicar
        </Button>
        <Button
          variant="secondary"
          onClick={() => alert("Copiar!")}
          size={size}
        >
          Copiar
        </Button>
        <Button
          variant="primary"
          onClick={() => alert("Informação!")}
          size={size}
        >
          <Info />
        </Button>

        <Button variant="danger" onClick={() => alert("Deletou!")} size={size}>
          Excluir
        </Button>
      </ButtonGroup>
    </div>
  );
};
