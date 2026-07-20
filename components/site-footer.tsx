import Link from "next/link";
import { site } from "@/lib/data";
import { NewsletterForm } from "@/components/newsletter-form";

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/originals", label: "Originals" },
  { href: "/commissions", label: "Commissions" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7c-2.2 0-3.8 1.5-3.8 3.4 0 1 .5 1.9 1.3 2.3l.4-1.2c-.3-.3-.5-.7-.5-1.1 0-1.3 1.1-2.3 2.6-2.3 1.4 0 2.4.9 2.4 2.2 0 1.6-.8 3-1.9 3-.6 0-1-.4-.9-1l.5-2" />
      <path d="M11 12.5 9.5 18" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl">June’s Studio</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Original drawings in white chalk on black canvas, graphite,
              pencil, charcoal and ink. Made slowly, by hand, in a studio with
              one very good window.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-stone transition-colors hover:text-paper"
              >
                <InstagramIcon />
              </a>
              <a
                href={site.pinterest}
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="text-stone transition-colors hover:text-paper"
              >
                <PinterestIcon />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 self-start">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-stone transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="eyebrow !text-stone">The Studio Letter</p>
            <p className="mt-4 mb-6 max-w-sm text-sm leading-relaxed text-stone">
              First viewing of new originals, notes from the studio, and
              collection announcements. A few letters a year — nothing more.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-graphite pt-8 text-xs text-stone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} June’s Studio. All artworks remain the copyright of the artist.</p>
          <p>Demo site — for presentation purposes.</p>
        </div>
      </div>
    </footer>
  );
}
