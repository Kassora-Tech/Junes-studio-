"use client";

import { useState, type FormEvent } from "react";
import type { Artwork } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Mock acquisition flow — demo only. Three styled steps ending in a
 * confirmation screen. No payment is processed and nothing is sent.
 */
export function AcquireDialog({ artwork }: { artwork: Artwork }) {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  const reset = (o: boolean) => {
    setOpen(o);
    if (!o) setTimeout(() => setStep(0), 300);
  };

  const next = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const steps = ["Your details", "Delivery", "Confirmation"];

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          {artwork.price === null ? "Inquire to Acquire" : "Acquire Artwork"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* Step indicator */}
        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2" aria-hidden>
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span
                className={
                  i <= step
                    ? "h-1.5 w-1.5 rounded-full bg-ink"
                    : "h-1.5 w-1.5 rounded-full bg-stone"
                }
              />
              <span
                className={
                  i === step
                    ? "text-[0.625rem] font-medium uppercase tracking-[0.18em] text-ink"
                    : "text-[0.625rem] font-medium uppercase tracking-[0.18em] text-graphite/50"
                }
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <form onSubmit={next}>
            <DialogTitle className="font-display text-2xl text-ink">
              Acquire “{artwork.title}”
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-graphite">
              {artwork.mediumLabel}, {artwork.dimensions} —{" "}
              {formatPrice(artwork.price)}. Framed, with Certificate of
              Authenticity, shipped insured worldwide.
            </DialogDescription>
            <div className="mt-8 space-y-6">
              <div>
                <Label htmlFor="acq-name">Full name</Label>
                <Input id="acq-name" required placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="acq-email">Email</Label>
                <Input id="acq-email" type="email" required placeholder="you@example.com" autoComplete="email" />
              </div>
            </div>
            <Button type="submit" className="mt-10 w-full">
              Continue to delivery
            </Button>
            <p className="mt-4 text-center text-[0.6875rem] text-graphite/60">
              Demonstration flow — no payment is taken.
            </p>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={next}>
            <DialogTitle className="font-display text-2xl text-ink">
              Delivery
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-graphite">
              Every original travels in a custom crate, insured and tracked.
              Delivery is complimentary worldwide.
            </DialogDescription>
            <div className="mt-8 space-y-6">
              <div>
                <Label htmlFor="acq-address">Address</Label>
                <Input id="acq-address" required placeholder="Street address" autoComplete="street-address" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="acq-city">City</Label>
                  <Input id="acq-city" required placeholder="City" autoComplete="address-level2" />
                </div>
                <div>
                  <Label htmlFor="acq-country">Country</Label>
                  <Input id="acq-country" required placeholder="Country" autoComplete="country-name" />
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-stone pt-6 text-sm">
              <span className="text-graphite">Total</span>
              <span className="font-display text-xl text-ink">
                {formatPrice(artwork.price)}
              </span>
            </div>
            <Button type="submit" className="mt-6 w-full">
              Confirm acquisition
            </Button>
            <p className="mt-4 text-center text-[0.6875rem] text-graphite/60">
              Demonstration flow — no payment is taken.
            </p>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink"
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12.5 9.5 18 20 6.5" />
              </svg>
            </div>
            <DialogTitle className="mt-6 font-display text-2xl text-ink">
              Thank you
            </DialogTitle>
            <DialogDescription className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-graphite">
              “{artwork.title}” is reserved for you. In a live gallery, a
              confirmation and shipping timeline would now arrive by email —
              this is a demonstration, so nothing has been charged or sent.
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="outline" className="mt-10">
                Return to the gallery
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
