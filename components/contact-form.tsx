"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/** Mock contact form — demo only, success state, nothing is sent. */
export function ContactForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <div className="border border-stone bg-ivory p-10 text-center" role="status">
        <h3 className="font-display text-2xl text-ink">Message received</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-graphite">
          Thank you for writing. In a live studio, June replies within two
          working days. This is a demonstration, so nothing has been sent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label htmlFor="ct-name">Full name</Label>
          <Input id="ct-name" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="ct-email">Email</Label>
          <Input id="ct-email" type="email" required placeholder="you@example.com" autoComplete="email" />
        </div>
      </div>
      <div>
        <Label htmlFor="ct-message">Message</Label>
        <Textarea id="ct-message" required rows={6} placeholder="How can the studio help?" />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Send Message
      </Button>
      <p className="text-[0.6875rem] text-graphite/60">
        Demonstration form — nothing is sent or stored.
      </p>
    </form>
  );
}
