import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-none border-b border-stone bg-transparent px-0 py-3 text-[0.9375rem] text-ink placeholder:text-graphite/50 transition-colors duration-300 focus:border-ink focus:outline-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
