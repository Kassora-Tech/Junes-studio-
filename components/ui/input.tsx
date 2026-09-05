import * as React from "react";
import { cn } from "@/lib/utils";

/** 16px on mobile so iOS never zooms the page when a field takes focus. */
export const fieldClass =
  "w-full border-b border-chalk/20 bg-transparent px-0 py-3.5 text-base text-chalk placeholder:text-chalk/55 transition-colors duration-300 focus:border-chalk focus:outline-none focus-visible:outline-none sm:text-[0.9375rem]";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldClass, className)} {...props} />
));
Input.displayName = "Input";
