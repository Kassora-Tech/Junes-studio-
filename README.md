# June’s Studio — Demo Pitch Site

A demo website for June, an independent fine artist working in white chalk on
black canvas, graphite, pencil, charcoal and ink. Built as a client pitch —
**no database, no real payments, no auth**. Every interaction (acquisition
flow, newsletter, contact and commission forms, wishlist) is mocked
client-side so the site demos well and deploys to Vercel with zero config.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-first theme in `app/globals.css`)
- GSAP + ScrollTrigger (scroll reveals) · Lenis (smooth scroll) · Framer Motion (entrances)
- Radix primitives (dialog, accordion, label), restyled shadcn-fashion in `components/ui/`
- Fraunces (display serif) + Inter (body) via `next/font`

## Content

All content lives in [`lib/data.ts`](lib/data.ts) as static typed arrays shaped
like CMS documents — swapping to Sanity/Contentful later is a drop-in
replacement. All imagery is Unsplash placeholder photography; every placeholder
carries a `// TODO: replace with client photo` comment.

## Run

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build (what Vercel runs)
```

## Deploy

Import the repo into Vercel — no configuration changes needed.

## Demo notes

- Wishlist persists in `localStorage` only.
- The “Acquire Artwork” flow is a styled multi-step mock ending in a
  confirmation screen; no payment is taken and forms send nothing.
- “Sold” labels are driven by the `available` flag in `lib/data.ts`.
