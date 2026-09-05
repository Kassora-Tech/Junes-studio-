"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/mark";
import { Menu } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

const links = [
  { href: "/gallery", label: "The Wall" },
  { href: "/originals", label: "Available" },
  { href: "/commissions", label: "Commissions" },
  { href: "/about", label: "The Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sunk, setSunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setSunk(window.scrollY > 40);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        // A solid ground rather than a blurred one: backdrop-filter on a fixed
        // bar is one of the most expensive things you can put on a phone.
        sunk || open ? "bg-void/95" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[100rem] items-center justify-between px-6 sm:h-24 sm:px-10">
        <Link href="/" aria-label="June’s Studio — home" className="text-chalk">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "u-label transition-colors duration-300 hover:text-chalk",
                  active && "!text-bone"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-chalk lg:hidden"
        >
          <Menu className="h-6 w-6" open={open} />
        </button>
      </div>

      <div
        id="menu-drawer"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 flex flex-col bg-void px-6 pt-8 lg:hidden"
      >
        <nav aria-label="Mobile">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ animationDelay: `${60 + i * 45}ms` }}
              className="u-h3 block animate-lift border-b border-chalk/10 py-5 text-chalk"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="u-label mt-auto pb-10">
          White chalk on black canvas · Drawn by hand
        </p>
      </div>
    </header>
  );
}
