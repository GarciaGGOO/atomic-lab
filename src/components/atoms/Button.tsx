import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    // Mapa de variações visuais
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
      secondary:
        "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-sm",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      ghost: "hover:bg-gray-100 text-gray-700 border-transparent",
    };

    // Mapa de tamanhos
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
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg bg-gray-50 border-dashed border-gray-300">
      <h3 className="font-bold text-gray-900">Button Gallery</h3>

      <Button variant="primary" size="sm">
        Primary Button sm
      </Button>

      <Button variant="primary" size="md">
        Primary Button md
      </Button>

      <Button variant="primary" size="lg">
        Primary Button lg
      </Button>

      <Button variant="secondary" size="md">
        Secondary Button
      </Button>

      <Button variant="danger" size="md">
        Danger Button
      </Button>

      <Button variant="ghost" size="md">
        Ghost Button
      </Button>
    </div>
  );
};
