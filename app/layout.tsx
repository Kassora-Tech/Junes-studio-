import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/data";

// A true didone for everything that carries the design, and one clean UI face
// for everything that carries information.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://junes-studio.vercel.app"),
  title: {
    default: "June’s Studio — Original drawings in chalk, charcoal and ink",
    template: "%s — June’s Studio",
  },
  description: site.description,
  openGraph: {
    title: "June’s Studio",
    description: site.description,
    type: "website",
    siteName: "June’s Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <body>
        <a
          href="#content"
          className="u-label sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-chalk focus:px-4 focus:py-3 focus:!text-void"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="relative z-[1]">
          {children}
        </main>
        <SiteFooter />
        <SmoothScroll />
        <Reveal />
      </body>
    </html>
  );
}
