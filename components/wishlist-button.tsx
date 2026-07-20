"use client";

import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={cn(
        "flex h-10 w-10 items-center justify-center transition-colors duration-300",
        saved ? "text-ink" : "text-graphite/60 hover:text-ink",
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M12 20.5s-7.5-4.7-9.3-9.2C1.2 7.6 3.6 4.5 6.9 4.5c2 0 3.7 1.1 5.1 2.9 1.4-1.8 3.1-2.9 5.1-2.9 3.3 0 5.7 3.1 4.2 6.8-1.8 4.5-9.3 9.2-9.3 9.2Z" />
      </svg>
    </button>
  );
}
