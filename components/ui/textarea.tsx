import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-none border-b border-stone bg-transparent px-0 py-3 text-base text-ink placeholder:text-graphite/50 transition-colors duration-300 focus:border-ink focus:outline-none sm:text-[0.9375rem]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
