import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "custom";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
      secondary:
        "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-sm",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      ghost: "hover:bg-gray-100 text-gray-700 border-transparent",
      custom: "",
    };

    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-8 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const ButtonExample = () => {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2 items-center justify-between">
        <Button variant="secondary" size="sm" onClick={() => setSize("sm")}>
          sm
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setSize("md")}>
          md
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setSize("lg")}>
          lg
        </Button>
      </div>

      <Button variant="primary" size={size}>
        Primary Button lg
      </Button>

      <Button variant="secondary" size={size}>
        Secondary Button
      </Button>

      <Button variant="danger" size={size}>
        Danger Button
      </Button>

      <Button variant="ghost" size={size}>
        Ghost Button
      </Button>
      <Button
        variant="custom"
        size={size}
        className="
          group relative isolate overflow-hidden rounded-xl bg-transparent
          transition-all duration-500 ease-out
          hover:scale-110 hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.8)]
          active:scale-95
        "
      >
        {/* 1. O Fundo "Líquido" Animado (Camada Inferior) */}
        <div className="absolute inset-[-50%] -z-20 h-[200%] w-[200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-30 mix-blend-overlay content-[''] group-hover:opacity-100 transition-opacity duration-500" />

        {/* 2. O Brilho de Neon Pulsante (Camada Média) */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-blue-300 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:blur-sm" />

        {/* 3. Efeito de Vidro Fosco (Overlay) */}
        <div className="absolute inset-[2px] -z-10 rounded-[10px] bg-black/40 backdrop-blur-md transition-colors duration-300 group-hover:bg-black/20" />

        {/* 4. O Texto com Efeito Glitch/Gradiente */}
        <span className="relative flex items-center justify-center gap-2 text-lg font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:tracking-[0.4em] group-hover:text-white">
          CUSTOM
          {/* Ícone opcional para dar um charme */}
          <span className="text-white drop-shadow-none animate-pulse">⚡</span>
        </span>

        {/* 5. Reflexo de Luz (Shine Effect) que passa ao passar o mouse */}
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-[shimmer_1s_infinite]" />
      </Button>
    </div>
  );
};
