import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  center?: boolean;
}

export function Section({ id, eyebrow, title, subtitle, children, className, center = true }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-32 px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title || subtitle) && (
          <Reveal className={cn("mb-12 md:mb-16", center && "text-center")}>
            {eyebrow ? (
              <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className={cn("mt-4 text-pretty text-base text-muted-foreground sm:text-lg", center && "mx-auto max-w-2xl")}>
                {subtitle}
              </p>
            ) : null}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
