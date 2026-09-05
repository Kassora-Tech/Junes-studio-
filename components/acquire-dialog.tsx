"use client";

import { useState, type FormEvent } from "react";
import type { Artwork } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight } from "@/components/brand/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Acquiring a work.
 *
 * Deliberately not a checkout. The trigger is a line of text, not a filled
 * button; the flow reads as writing to a gallery about a piece you would like
 * to take home. No payment is processed — this is a demonstration.
 */
export function AcquireDialog({ artwork }: { artwork: Artwork }) {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) window.setTimeout(() => setStep(0), 250);
  };

  const advance = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="u-label link-hair inline-flex items-center gap-2 !text-chalk"
        >
          {artwork.price === null ? "Enquire about this work" : "Acquire this work"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <p className="u-label" aria-hidden>
          {step === 2 ? "Noted" : `Step ${step + 1} of 2`}
        </p>

        {step === 0 && (
          <form onSubmit={advance}>
            <DialogTitle className="u-work mt-5 text-3xl text-chalk">
              {artwork.title}
            </DialogTitle>
            <DialogDescription className="u-micro mt-3">
              {artwork.mediumLabel}, {artwork.dimensions} ·{" "}
              {formatPrice(artwork.price)}. Framed where the medium requires it,
              with its certificate, shipped insured worldwide.
            </DialogDescription>

            <div className="mt-10 space-y-7">
              <div>
                <Label htmlFor="acq-name">Your name</Label>
                <Input id="acq-name" required autoComplete="name" placeholder="Name" />
              </div>
              <div>
                <Label htmlFor="acq-email">Email</Label>
                <Input
                  id="acq-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="acq-where">Where it would hang (optional)</Label>
                <Input id="acq-where" placeholder="A room, a wall, a city" />
              </div>
            </div>

            <Button type="submit" className="mt-10 w-full">
              Continue
            </Button>
            <p className="u-micro mt-5 text-center text-chalk/60">
              A demonstration flow. Nothing is charged and nothing is sent.
            </p>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={advance}>
            <DialogTitle className="u-h3 mt-5 text-chalk">
              Where should it travel?
            </DialogTitle>
            <DialogDescription className="u-micro mt-3">
              Every original goes in a crate built for it, insured and tracked.
              Delivery is included, wherever you are.
            </DialogDescription>

            <div className="mt-10 space-y-7">
              <div>
                <Label htmlFor="acq-address">Address</Label>
                <Input
                  id="acq-address"
                  required
                  autoComplete="street-address"
                  placeholder="Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-7">
                <div>
                  <Label htmlFor="acq-city">City</Label>
                  <Input
                    id="acq-city"
                    required
                    autoComplete="address-level2"
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="acq-country">Country</Label>
                  <Input
                    id="acq-country"
                    required
                    autoComplete="country-name"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-baseline justify-between border-t border-chalk/10 pt-7">
              <span className="u-label">Total</span>
              <span className="u-micro text-chalk">{formatPrice(artwork.price)}</span>
            </div>

            <Button type="submit" variant="solid" className="mt-7 w-full">
              Confirm
            </Button>
            <p className="u-micro mt-5 text-center text-chalk/60">
              A demonstration flow. Nothing is charged and nothing is sent.
            </p>
          </form>
        )}

        {step === 2 && (
          <div className="py-4">
            <span
              className="mt-6 flex h-12 w-12 items-center justify-center border border-bone text-bone"
              aria-hidden
            >
              <Check className="h-5 w-5" />
            </span>
            <DialogTitle className="u-h3 mt-8 text-chalk">
              {artwork.title} is held for you.
            </DialogTitle>
            <DialogDescription className="u-body mt-5">
              In a working studio, June would now write to you herself with the
              framing choices and a shipping date. This is a demonstration, so
              nothing has been charged and no message has been sent.
            </DialogDescription>
            <DialogClose asChild>
              <Button className="mt-10">Back to the wall</Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
