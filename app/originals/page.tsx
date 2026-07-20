import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { Eyebrow } from "@/components/section";

export const metadata: Metadata = {
  title: "Available Originals",
  description:
    "Original drawings currently available for acquisition from June's Studio — each framed, certified and shipped insured worldwide.",
};

export default function OriginalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40 sm:pb-32">
      <div className="max-w-2xl">
        <Eyebrow>For Acquisition</Eyebrow>
        <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
          Available Originals
        </h1>
        <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite">
          Works currently available to acquire from the studio. Each original
          arrives framed behind museum glass, accompanied by its signed
          Certificate of Authenticity, and travels insured — worldwide.
        </p>
      </div>
      <div className="mt-16">
        <GalleryGrid availableOnly />
      </div>
    </div>
  );
}
