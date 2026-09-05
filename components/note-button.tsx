"use client";

import { useWishlist } from "@/lib/wishlist";
import { Noted } from "@/components/brand/icons";

/**
 * A visitor's own mark against a work they are following — the pencil tick on
 * a gallery list, not a shopping heart. Lives in the label, never on the work.
 */
export function NoteButton({
  slug,
  title,
  className,
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const marked = has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={marked}
      aria-label={marked ? `Remove ${title} from your list` : `Note ${title} on your list`}
      className={`-m-2 inline-flex h-9 w-9 items-center justify-center p-2 transition-colors duration-300 ${
        marked ? "text-bone" : "text-chalk/60 hover:text-chalk"
      } ${className ?? ""}`}
    >
      <Noted className="h-full w-full" marked={marked} />
    </button>
  );
}
