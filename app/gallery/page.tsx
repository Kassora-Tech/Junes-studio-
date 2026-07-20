import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { Eyebrow } from "@/components/section";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The complete collection of original drawings by June — white chalk on black canvas, graphite, pencil, charcoal and ink.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40 sm:pb-32">
      <div className="max-w-2xl">
        <Eyebrow>The Collection</Eyebrow>
        <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">Gallery</h1>
        <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite">
          Every original in the studio's collection, across five mediums. Works
          marked sold remain here as part of the record — a gallery is a
          history as much as it is a wall.
        </p>
      </div>
      <div className="mt-16">
        <GalleryGrid />
      </div>
    </div>
  );
}
