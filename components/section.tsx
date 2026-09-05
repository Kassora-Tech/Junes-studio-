import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The page gutter. Generous margins are most of what makes a wall read. */
export function Shell({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-6 sm:px-10",
        wide ? "max-w-[100rem]" : "max-w-[88rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Spreads the rest of its props so `data-lift` actually reaches the DOM. */
export function Eyebrow({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("u-label", className)} {...rest}>
      {children}
    </p>
  );
}

export function Section({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section className={cn("py-24 sm:py-36", className)}>
      <Shell wide={wide}>{children}</Shell>
    </section>
  );
}

/**
 * A room title. The eyebrow behaves like the small card beside a doorway;
 * the heading is the room itself.
 */
export function RoomTitle({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow data-lift="0">{eyebrow}</Eyebrow>
      <h2 className="u-h2 mt-6 text-chalk" data-lift="1">
        {title}
      </h2>
      {children && (
        <div className="u-body u-measure mt-6" data-lift="2">
          {children}
        </div>
      )}
    </div>
  );
}
