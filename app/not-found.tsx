import Link from "next/link";
import { Shell } from "@/components/section";
import { ArrowRight } from "@/components/brand/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] items-center">
      <Shell>
        <p className="u-label">Nothing hung here</p>
        <h1 className="u-h1 mt-6 max-w-2xl text-chalk">
          This wall is bare.
        </h1>
        <p className="u-body u-measure mt-8">
          Whatever you were looking for is not on this one. The rest of the
          work is through the next room.
        </p>
        <Link
          href="/gallery"
          className="u-label link-hair mt-10 inline-flex items-center gap-2 !text-chalk"
        >
          See the wall
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Shell>
    </div>
  );
}
