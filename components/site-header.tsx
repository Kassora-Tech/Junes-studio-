"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/originals", label: "Originals" },
  { href: "/commissions", label: "Commissions" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled || open
          ? "border-b border-stone/60 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink sm:text-2xl"
          aria-label="June's Studio — home"
        >
          June’s Studio
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                pathname.startsWith(link.href)
                  ? "text-ink"
                  : "text-graphite hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span
            className={cn(
              "absolute h-px w-6 bg-ink transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-[4px]"
            )}
          />
          <span
            className={cn(
              "absolute h-px w-6 bg-ink transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-[4px]"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            aria-label="Mobile"
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-paper px-5 pt-10 lg:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  className="block border-b border-stone/60 py-5 font-display text-2xl text-ink"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <p className="mt-auto pb-10 text-xs tracking-[0.18em] uppercase text-graphite">
              Original drawings · Chalk on black canvas
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
