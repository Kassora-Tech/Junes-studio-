import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full border-b border-stone bg-transparent px-0 py-3 text-[0.9375rem] text-ink placeholder:text-graphite/50 transition-colors duration-300 focus:border-ink focus:outline-none",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
