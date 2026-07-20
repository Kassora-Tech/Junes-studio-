"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Mock newsletter signup — demo only, shows a success state, sends nothing. */
export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <p
        className={
          variant === "dark"
            ? "text-sm leading-relaxed text-stone"
            : "text-sm leading-relaxed text-graphite"
        }
        role="status"
      >
        Thank you — you’re on the list. New work and studio letters arrive
        quietly, a few times a year.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md items-end gap-4">
      <Input
        type="email"
        required
        name="email"
        placeholder="Your email address"
        aria-label="Email address"
        className={
          variant === "dark"
            ? "border-graphite text-paper placeholder:text-stone/60 focus:border-paper"
            : undefined
        }
      />
      <Button
        type="submit"
        variant={variant === "dark" ? "outline" : "primary"}
        className={
          variant === "dark"
            ? "shrink-0 border-stone px-5 py-3 text-paper hover:bg-paper hover:text-ink"
            : "shrink-0 px-5 py-3"
        }
      >
        Join
      </Button>
    </form>
  );
}
