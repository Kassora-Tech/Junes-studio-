"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { commissionCategories } from "@/lib/data";

/** Mock commission inquiry — demo only. File input shows the chosen filename; nothing uploads. */
export function CommissionForm() {
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <div className="border border-stone bg-paper p-10 text-center sm:p-14" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 12.5 9.5 18 20 6.5" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-2xl text-ink">Inquiry received</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-graphite">
          Thank you — in a live studio, June would reply within two working
          days to arrange a consultation. This is a demonstration, so nothing
          has been sent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label htmlFor="com-name">Full name</Label>
          <Input id="com-name" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="com-email">Email</Label>
          <Input id="com-email" type="email" required placeholder="you@example.com" autoComplete="email" />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label htmlFor="com-category">Category</Label>
          <div className="relative">
            <select
              id="com-category"
              required
              defaultValue=""
              className="w-full appearance-none border-b border-stone bg-transparent px-0 py-3 text-[0.9375rem] text-ink transition-colors duration-300 focus:border-ink focus:outline-none"
            >
              <option value="" disabled>
                Select a category
              </option>
              {commissionCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-graphite" aria-hidden>
              ↓
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="com-budget">Budget range</Label>
          <div className="relative">
            <select
              id="com-budget"
              required
              defaultValue=""
              className="w-full appearance-none border-b border-stone bg-transparent px-0 py-3 text-[0.9375rem] text-ink transition-colors duration-300 focus:border-ink focus:outline-none"
            >
              <option value="" disabled>
                Select a range
              </option>
              <option>€1,000 – €2,000</option>
              <option>€2,000 – €4,000</option>
              <option>€4,000 – €7,000</option>
              <option>€7,000 +</option>
            </select>
            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-graphite" aria-hidden>
              ↓
            </span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="com-description">Tell June about the piece</Label>
        <Textarea
          id="com-description"
          required
          rows={5}
          placeholder="The subject, the story behind it, rough size, where it will hang…"
        />
      </div>

      <div>
        <Label htmlFor="com-reference">Reference image (optional)</Label>
        <label
          htmlFor="com-reference"
          className="mt-2 flex cursor-pointer items-center justify-between gap-4 border border-dashed border-stone px-5 py-4 text-sm text-graphite transition-colors hover:border-ink"
        >
          <span>{fileName ?? "Attach a photograph"}</span>
          <span className="text-[0.6875rem] uppercase tracking-[0.18em]">Browse</span>
        </label>
        <input
          id="com-reference"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Send Inquiry
      </Button>
      <p className="text-[0.6875rem] text-graphite/60">
        Demonstration form — nothing is sent or stored.
      </p>
    </form>
  );
}
