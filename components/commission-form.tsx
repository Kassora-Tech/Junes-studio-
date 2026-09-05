"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, fieldClass } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check } from "@/components/brand/icons";
import { commissionCategories } from "@/lib/data";

/** Mock enquiry — demonstration only. The file field names the chosen file
 *  and nothing is uploaded, sent or stored. */
export function CommissionForm() {
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  if (done) {
    return (
      <div className="border border-chalk/12 p-10 sm:p-14" role="status">
        <span
          className="flex h-12 w-12 items-center justify-center border border-bone text-bone"
          aria-hidden
        >
          <Check className="h-5 w-5" />
        </span>
        <h3 className="u-h3 mt-8 text-chalk">Your note is with the studio.</h3>
        <p className="u-body mt-5 max-w-md">
          In a working studio June would read this herself and write back to
          arrange a conversation. This is a demonstration, so nothing has
          been sent.
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
          <Label htmlFor="com-name">Your name</Label>
          <Input id="com-name" required autoComplete="name" placeholder="Name" />
        </div>
        <div>
          <Label htmlFor="com-email">Email</Label>
          <Input
            id="com-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <Label htmlFor="com-category">Subject</Label>
          <select id="com-category" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a subject
            </option>
            {commissionCategories.map((c) => (
              <option key={c.id} value={c.id} className="bg-void">
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="com-budget">Budget</Label>
          <select id="com-budget" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a range
            </option>
            {["€1,000 – €2,000", "€2,000 – €4,000", "€4,000 – €7,000", "€7,000 +"].map(
              (range) => (
                <option key={range} className="bg-void">
                  {range}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="com-description">The piece you have in mind</Label>
        <Textarea
          id="com-description"
          required
          rows={5}
          placeholder="Who or what it is, roughly how big, and where it would hang."
        />
      </div>

      <div>
        <Label htmlFor="com-reference">A photograph to work from</Label>
        <label
          htmlFor="com-reference"
          className="u-micro mt-3 flex cursor-pointer items-center justify-between gap-4 border border-dashed border-chalk/20 px-5 py-5 transition-colors hover:border-chalk/60"
        >
          <span className={fileName ? "text-chalk" : "text-chalk/60"}>
            {fileName ?? "Attach an image (optional)"}
          </span>
          <span className="u-label">Choose</span>
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
        Send to the studio
      </Button>
      <p className="u-micro text-chalk/60">
        A demonstration form. Nothing is sent or stored.
      </p>
    </form>
  );
}
