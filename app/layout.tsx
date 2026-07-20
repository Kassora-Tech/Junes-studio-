import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { RevealManager } from "@/components/motion/reveal";
import { GalleryCursor } from "@/components/motion/gallery-cursor";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://junes-studio.vercel.app"),
  title: {
    default: "June’s Studio — Original Drawings in Chalk, Charcoal & Ink",
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
          <RevealManager />
          <GalleryCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
