import type { Metadata } from "next";
import { Shell, Eyebrow } from "@/components/section";
import { WallFilter } from "@/components/wall-filter";

export const metadata: Metadata = {
  title: "The Wall",
  description:
    "The complete wall of original drawings by June — white chalk on black canvas, graphite, pencil, charcoal and ink, hung at true relative scale.",
};

export default function GalleryPage() {
  return (
    <div className="pb-32 pt-40 sm:pb-44 sm:pt-52">
      <Shell wide>
        <div className="max-w-3xl">
          <Eyebrow data-lift="0">The Collection</Eyebrow>
          <h1 className="u-h1 mt-6 text-chalk" data-lift="1">
            The wall
          </h1>
          <p className="u-lede u-measure mt-8" data-lift="2">
            Every original in the studio, across five mediums, hung at true
            relative scale on a single line. Works that have gone stay on the
            wall — a gallery is a record as much as it is an offer.
          </p>
        </div>

        <div className="mt-20 sm:mt-28">
          <WallFilter />
        </div>
      </Shell>
    </div>
  );
}
