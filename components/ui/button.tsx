import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Two buttons only.
 *
 * `line` is the default everywhere: a hairline that fills with chalk on hover,
 * matching the rules and label weights used across the wall. `solid` exists
 * for the single confirming action inside a dialog, where a filled control is
 * genuinely the clearest thing. Nothing on a page ever shouts.
 */
type Variant = "line" | "solid";

const variants: Record<Variant, string> = {
  line: "border border-chalk/25 text-chalk hover:border-chalk hover:bg-chalk hover:text-void",
  solid: "bg-chalk text-void hover:bg-bone",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "line", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "u-label inline-flex items-center justify-center gap-3 px-7 py-4 !text-current transition-colors duration-400 disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
