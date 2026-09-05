import type { Metadata } from "next";
import { Shell, Eyebrow } from "@/components/section";
import { WallFilter } from "@/components/wall-filter";

export const metadata: Metadata = {
  title: "Available",
  description:
    "Original drawings currently available from June's Studio — each one of one, framed, certified and shipped insured worldwide.",
};

export default function OriginalsPage() {
  return (
    <div className="pb-32 pt-40 sm:pb-44 sm:pt-52">
      <Shell wide>
        <div className="max-w-3xl">
          <Eyebrow data-lift="0">Still Here</Eyebrow>
          <h1 className="u-h1 mt-6 text-chalk" data-lift="1">
            Available originals
          </h1>
          <p className="u-lede u-measure mt-8" data-lift="2">
            The works that have not yet gone. Each is one of one, framed behind
            museum glass where the medium requires it, and travels insured with
            its signed certificate.
          </p>
        </div>

        <div className="mt-20 sm:mt-28">
          <WallFilter availableOnly />
        </div>
      </Shell>
    </div>
  );
}
