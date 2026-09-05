"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/brand/icons";

/** Mock signup — demonstration only. Shows a success state, sends nothing. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="u-body max-w-md" role="status">
        Thank you — you’re on the list. Letters arrive a few times a year,
        never more.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex max-w-md items-end gap-3 border-b border-chalk/20 pb-2 focus-within:border-chalk/60"
    >
      <label htmlFor="letter-email" className="sr-only">
        Email address
      </label>
      <input
        id="letter-email"
        type="email"
        name="email"
        required
        placeholder="Your email address"
        className="w-full bg-transparent py-2 text-base text-chalk placeholder:text-chalk/55 focus:outline-none sm:text-[0.9375rem]"
      />
      <button
        type="submit"
        className="-m-2 flex h-10 w-10 shrink-0 items-center justify-center p-2 text-chalk/60 transition-colors hover:text-bone"
        aria-label="Join the studio letter"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </form>
  );
}
