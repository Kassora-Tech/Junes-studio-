import Link from "next/link";
import { site } from "@/lib/data";
import { Monogram } from "@/components/brand/mark";
import { NewsletterForm } from "@/components/newsletter-form";

const links = [
  { href: "/gallery", label: "The Wall" },
  { href: "/originals", label: "Available" },
  { href: "/commissions", label: "Commissions" },
  { href: "/about", label: "The Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-chalk/10">
      <div className="mx-auto max-w-[100rem] px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="u-label">The Studio Letter</p>
            <p className="u-h3 mt-5 max-w-md text-chalk">
              First sight of new work, before it reaches the wall.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 self-start sm:grid-cols-[1fr_auto]">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="u-label hover:text-chalk">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="u-label hover:text-chalk"
              >
                Instagram
              </a>
              <a
                href={site.pinterest}
                target="_blank"
                rel="noreferrer"
                className="u-label hover:text-chalk"
              >
                Pinterest
              </a>
              <a href={`mailto:${site.email}`} className="u-label hover:text-chalk">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-chalk/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <Monogram className="h-14 w-auto text-chalk/12" />
          <div className="u-micro flex flex-col gap-1 text-chalk/60 sm:items-end">
            <p>
              © {new Date().getFullYear()} June’s Studio. All works remain the
              copyright of the artist.
            </p>
            <p>Demonstration site — built for presentation.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
