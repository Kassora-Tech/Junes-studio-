"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check } from "@/components/brand/icons";

/** Mock contact — demonstration only. Success state, nothing sent. */
export function ContactForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="border border-chalk/12 p-10 sm:p-14" role="status">
        <span
          className="flex h-12 w-12 items-center justify-center border border-bone text-bone"
          aria-hidden
        >
          <Check className="h-5 w-5" />
        </span>
        <h2 className="u-h3 mt-8 text-chalk">Thank you for writing.</h2>
        <p className="u-body mt-5 max-w-md">
          Letters to the studio are answered in the order they arrive. This is
          a demonstration, so nothing has been sent.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-9"
    >
      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <Label htmlFor="ct-name">Your name</Label>
          <Input id="ct-name" required autoComplete="name" placeholder="Name" />
        </div>
        <div>
          <Label htmlFor="ct-email">Email</Label>
          <Input
            id="ct-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="ct-message">Your message</Label>
        <Textarea
          id="ct-message"
          required
          rows={6}
          placeholder="A work, a commission, framing, shipping — anything at all."
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Send
      </Button>
      <p className="u-micro text-chalk/60">
        A demonstration form. Nothing is sent or stored.
      </p>
    </form>
  );
}
