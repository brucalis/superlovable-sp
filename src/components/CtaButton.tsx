import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
}

const sizes = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function CtaButton({ href, children, variant = "primary", size = "md", className, target, rel }: CtaButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out active:scale-[0.98]",
        sizes[size],
        variant === "primary"
          ? "bg-brand text-primary-foreground shadow-[0_10px_30px_-12px_oklch(0.7_0.23_350/0.7)] hover:-translate-y-0.5 hover:shadow-glow"
          : "glass text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary",
        className,
      )}
    >
      {children}
    </a>
  );
}
