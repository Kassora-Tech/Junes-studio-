import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      data-reveal
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "ivory" | "ink";
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-28",
        tone === "ivory" && "bg-ivory",
        tone === "ink" && "bg-ink text-paper",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
