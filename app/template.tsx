import type { ReactNode } from "react";

/** A soft crossfade between rooms. Opacity only — nothing that could create a
 *  containing block and disturb fixed positioning. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
