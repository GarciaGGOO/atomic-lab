import {
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  align?: "start" | "center" | "end";
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, isOpen, onClose, triggerRef, align = "start", children, ...props }, ref) => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const popoverRef = useRef<HTMLDivElement>(null);

    // Calcula a posição do popover baseado no trigger
    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const updatePosition = () => {
        const triggerRect = triggerRef.current?.getBoundingClientRect();
        if (!triggerRect) return;

        let left = triggerRect.left;
        if (align === "center") {
          left = triggerRect.left + triggerRect.width / 2;
        } else if (align === "end") {
          left = triggerRect.right;
        }

        setPosition({
          top: triggerRect.bottom + window.scrollY + 4,
          left: left + window.scrollX,
          width: triggerRect.width,
        });
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen, triggerRef, align]);

    // Fecha ao clicar fora
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          popoverRef.current &&
          !popoverRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    // Fecha com Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
      <div
        ref={(node) => {
          // Merge refs
          (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          width: position.width,
          minWidth: "200px",
        }}
        className={cn(
          // Layout
          "z-50 overflow-hidden rounded-md",
          // Visual
          "bg-white border border-gray-200 shadow-lg",
          // Animação
          "animate-in fade-in-0 zoom-in-95 duration-150",
          className
        )}
        {...props}
      >
        {children}
      </div>,
      document.body
    );
  }
);

Popover.displayName = "Popover";
