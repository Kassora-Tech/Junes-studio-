"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven cinematics. Four vocabularies, all opt-in via data attributes:
 *
 *  data-reveal        — fade + 14px drift-in ("data-reveal-group" staggers children)
 *  data-mask          — heading slides up out of an overflow-hidden parent
 *  data-reveal-image  — curtain: clip-path wipes open while the image settles from 1.14→1
 *  data-parallax      — subtle scrubbed drift (value = strength in %, default 8)
 *
 * CSS applies the hidden initial states only after `.gsap-ready` is set here,
 * so no-JS and reduced-motion visitors always see content.
 */
export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("gsap-ready");

    const ctx = gsap.context(() => {
      // Masked heading reveals
      document.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
        gsap.to(el, {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top 88%" },
        });
      });

      // Curtain image reveals
      document.querySelectorAll<HTMLElement>("[data-reveal-image]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        tl.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.25,
          ease: "power4.inOut",
        });
        if (img) {
          tl.to(
            img,
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
              // hand transform back to CSS so hover scales keep working
              onComplete: () => gsap.set(img, { clearProps: "transform" }),
            },
            "<0.05"
          );
        }
      });

      // Subtle scrubbed parallax
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const strength = Number(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -strength },
          {
            yPercent: strength,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Grouped reveals stagger together.
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      // Solo reveals.
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-group] [data-reveal])")
        .forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
