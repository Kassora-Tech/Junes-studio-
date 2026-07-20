/**
 * June's Studio — content layer.
 *
 * Everything the site renders lives here as static, typed arrays. Objects are
 * shaped like future CMS documents (Sanity/Contentful), so swapping this file
 * for real CMS queries later is a drop-in replacement: keep the types, replace
 * the arrays with fetches.
 *
 * All imagery is placeholder stock photography (Unsplash) chosen to match the
 * brief — chalk/charcoal texture, monochrome subjects, framed work in quiet
 * interiors. Every image is flagged for replacement before real launch.
 */

export type Medium = "chalk" | "graphite" | "pencil" | "charcoal" | "ink";

export interface ArtworkImage {
  src: string;
  alt: string;
}

export interface Artwork {
  _type: "artwork";
  slug: string;
  title: string;
  medium: Medium;
  mediumLabel: string; // e.g. "White chalk on black canvas"
  dimensions: string;
  year: number;
  price: number | null; // null → "Inquire for Price"
  available: boolean;
  featured: boolean;
  description: string;
  image: ArtworkImage; // primary
  details: ArtworkImage[]; // texture / close-up shots
}

export interface JournalPost {
  _type: "journalPost";
  slug: string;
  title: string;
  category:
    | "Behind the Scenes"
    | "Work in Progress"
    | "New Collections"
    | "Art Inspiration"
    | "Studio Life";
  date: string; // ISO
  excerpt: string;
  image: ArtworkImage;
  body: string[]; // paragraphs
}

export interface Testimonial {
  _type: "testimonial";
  quote: string;
  name: string;
  context: string;
}

export interface CommissionCategory {
  _type: "commissionCategory";
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  image: ArtworkImage;
}

export interface FaqItem {
  _type: "faqItem";
  question: string;
  answer: string;
}

/** Build an Unsplash URL. `mono` desaturates so photography reads as chalk/graphite. */
const u = (id: string, mono = false) =>
  `https://images.unsplash.com/${id}?q=80&w=1800&auto=format&fit=crop${mono ? "&sat=-100" : ""}`;

/* ------------------------------------------------------------------ */
/* Artworks                                                            */
/* ------------------------------------------------------------------ */

// Shared close-up/texture shots, reused across pieces the way a real studio
// photographs surface details. TODO: replace with client photos.
const tex = {
  chalkDust: {
    src: u("photo-1544967082-d9d25d867d66", true),
    alt: "Close-up of chalk texture and layered strokes on a dark surface",
  },
  paperEdge: {
    src: u("photo-1517646287270-a5a9ca602e5c", true),
    alt: "Detail of the drawing's edge showing raw surface and fine dust",
  },
  graphiteMacro: {
    src: u("photo-1519999482648-25049ddd37b1", true),
    alt: "Macro detail of fine graphite linework catching the light",
  },
  charcoalBlend: {
    src: u("photo-1518998053901-5348d3961a04", true),
    alt: "Close-up of charcoal shading and blended tone on cotton paper",
  },
  inkBrush: {
    src: u("photo-1455390582262-044cdead277a", true),
    alt: "An ink pen resting mid-stroke on handwritten linework",
  },
  pencilHatch: {
    src: u("photo-1526304640581-d334cdbbf45e", true),
    alt: "Detail of pencil hatching and soft graphite gradients",
  },
  softLight: {
    src: u("photo-1494059980473-813e73ee784b", true),
    alt: "Soft window light falling across a blended monochrome surface",
  },
  deskTools: {
    src: u("photo-1513364776144-60967b0f800f", true),
    alt: "Chalks, charcoal sticks and pencils laid out on the studio table",
  },
  inkPooling: {
    src: u("photo-1515462277126-2dd0c162007a", true),
    alt: "Detail of ink pooling and dry-brush texture on cold-press paper",
  },
  sketchTable: {
    src: u("photo-1452802447250-470a88ac82bc", true),
    alt: "A drawing in progress on the studio drafting table",
  },
  framedWork: {
    src: u("photo-1513519245088-0e12902e5a38", true),
    alt: "The finished work framed and hung on a pale gallery wall",
  },
  studioEasel: {
    src: u("photo-1502920917128-1aa500764cbd", true),
    alt: "Evening light in the studio, the easel silhouetted against the window",
  },
};

export const artworks: Artwork[] = [
  {
    _type: "artwork",
    slug: "stillness-in-white",
    title: "Stillness in White",
    medium: "chalk",
    mediumLabel: "White chalk on black canvas",
    dimensions: "100 × 140 cm",
    year: 2026,
    price: 4800,
    available: true,
    featured: true,
    description:
      "The first piece in the Nocturne series. A mountain ridge drawn entirely in white chalk, built up over three weeks of slow layering — the black canvas left untouched wherever shadow falls. I wanted the light to feel like it was arriving, not painted on.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1519681393784-d120267933ba"),
      alt: "White chalk drawing of a moonlit mountain ridge emerging from a black canvas",
    },
    details: [tex.chalkDust, tex.paperEdge, tex.framedWork],
  },
  {
    _type: "artwork",
    slug: "mare-at-dusk",
    title: "Mare at Dusk",
    medium: "charcoal",
    mediumLabel: "Charcoal on cotton paper",
    dimensions: "70 × 100 cm",
    year: 2025,
    price: 3200,
    available: true,
    featured: true,
    description:
      "Drawn from an evening spent at a friend's farm in the last hour of light. Charcoal is the only medium I trust with a horse — it moves the way they do, all weight and softness at once.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1553284965-83fd3e82fa5a", true),
      alt: "Charcoal drawing of a horse standing in an open field, rendered in deep greys",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1534773728080-33d31da27ae5", true),
        alt: "Study detail of the mare's head and mane in soft charcoal",
      },
      tex.charcoalBlend,
      tex.softLight,
    ],
  },
  {
    _type: "artwork",
    slug: "the-elder",
    title: "The Elder",
    medium: "charcoal",
    mediumLabel: "Charcoal and chalk on toned paper",
    dimensions: "90 × 120 cm",
    year: 2026,
    price: 5600,
    available: true,
    featured: true,
    description:
      "A silverback at rest, drawn over two months from footage filmed by a primatologist friend. The face took a week; the expression took the rest. I have never drawn anything that looked back at me quite like this.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1517021897933-0e0319cfbc28", true),
      alt: "Charcoal portrait of a silverback gorilla's face in deep contemplative shadow",
    },
    details: [tex.charcoalBlend, tex.chalkDust, tex.studioEasel],
  },
  {
    _type: "artwork",
    slug: "watchful",
    title: "Watchful",
    medium: "graphite",
    mediumLabel: "Graphite on Bristol board",
    dimensions: "50 × 65 cm",
    year: 2025,
    price: 2400,
    available: false,
    featured: true,
    description:
      "A lion's gaze held for two hundred hours. Every whisker is a single unbroken graphite line. This piece taught me patience I didn't know I was missing.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1546182990-dffeafbe841d", true),
      alt: "Highly detailed graphite portrait of a lion's face in monochrome",
    },
    details: [tex.graphiteMacro, tex.pencilHatch, tex.sketchTable],
  },
  {
    _type: "artwork",
    slug: "leopard-resting",
    title: "Leopard, Resting",
    medium: "graphite",
    mediumLabel: "Graphite and carbon pencil on Bristol board",
    dimensions: "55 × 75 cm",
    year: 2025,
    price: 2900,
    available: true,
    featured: false,
    description:
      "Rosettes are a drawing lesson in themselves: no two alike, every one describing the muscle underneath. Drawn with carbon pencil for the deepest blacks graphite alone can't reach.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1456926631375-92c8ce872def", true),
      alt: "Graphite drawing of a leopard resting on a branch, spotted coat in monochrome",
    },
    details: [tex.graphiteMacro, tex.sketchTable, tex.softLight],
  },
  {
    _type: "artwork",
    slug: "fox-study-ii",
    title: "Fox Study II",
    medium: "pencil",
    mediumLabel: "Pencil on hot-press paper",
    dimensions: "40 × 50 cm",
    year: 2025,
    price: 1600,
    available: true,
    featured: true,
    description:
      "Second of three studies of the same red fox, drawn from photographs taken over a winter. In pencil, without colour, a fox becomes all attention — ears, eyes, and stillness.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1474511320723-9a56873867b5", true),
      alt: "Pencil study of a fox with alert ears, drawn in fine monochrome detail",
    },
    details: [tex.pencilHatch, tex.graphiteMacro, tex.deskTools],
  },
  {
    _type: "artwork",
    slug: "the-owl",
    title: "The Owl",
    medium: "pencil",
    mediumLabel: "Pencil and white chalk on grey paper",
    dimensions: "45 × 60 cm",
    year: 2024,
    price: 1800,
    available: true,
    featured: false,
    description:
      "A barn owl drawn on mid-grey paper — pencil for the shadow side, chalk for the moonlit one. Owls are mostly silence with a face; the drawing tries to keep it that way.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1543549790-8b5f4a028cfb", true),
      alt: "Pencil and chalk drawing of a barn owl's pale face against dark plumage",
    },
    details: [tex.pencilHatch, tex.chalkDust, tex.paperEdge],
  },
  {
    _type: "artwork",
    slug: "old-soul",
    title: "Old Soul",
    medium: "charcoal",
    mediumLabel: "Charcoal and white chalk on toned paper",
    dimensions: "45 × 60 cm",
    year: 2024,
    price: null,
    available: true,
    featured: true,
    description:
      "A commissioned portrait of a fourteen-year-old labrador named Gus, which his family kindly allowed me to keep in the collection a while longer. The grey muzzle was drawn with the same chalk I use for moonlight.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1543466835-00a7907e9de1", true),
      alt: "Charcoal portrait of an elderly labrador with a grey muzzle and gentle eyes",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1552053831-71594a27632d", true),
        alt: "Study of the labrador's head tilted in soft light, in blended charcoal",
      },
      tex.charcoalBlend,
      tex.softLight,
    ],
  },
  {
    _type: "artwork",
    slug: "her-quiet-hours",
    title: "Her Quiet Hours",
    medium: "ink",
    mediumLabel: "India ink on cold-press paper",
    dimensions: "56 × 76 cm",
    year: 2024,
    price: 2800,
    available: true,
    featured: true,
    description:
      "A portrait built from perhaps forty brush strokes, no more. Ink forgives nothing, which is exactly why I keep returning to it — every mark has to be meant.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1502323777036-f29e3972d82f", true),
      alt: "Minimal ink portrait of a woman in profile, rendered in confident dark strokes",
    },
    details: [tex.inkBrush, tex.inkPooling, tex.softLight],
  },
  {
    _type: "artwork",
    slug: "swan",
    title: "Swan",
    medium: "ink",
    mediumLabel: "Sumi ink and wash on washi paper",
    dimensions: "50 × 70 cm",
    year: 2025,
    price: 2400,
    available: true,
    featured: false,
    description:
      "White subject, black medium — a swan in ink is drawn entirely by what you leave out. The bird is untouched paper; everything else is night and water.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1516541196182-6bdb0516ed27", true),
      alt: "Ink wash drawing of a white swan gliding on dark water",
    },
    details: [tex.inkPooling, tex.inkBrush, tex.paperEdge],
  },
  {
    _type: "artwork",
    slug: "the-long-field",
    title: "The Long Field",
    medium: "charcoal",
    mediumLabel: "Willow charcoal on paper",
    dimensions: "80 × 120 cm",
    year: 2024,
    price: 3600,
    available: false,
    featured: false,
    description:
      "The view from my grandmother's kitchen window, drawn from memory twenty years after the house was sold. Willow charcoal smudges like memory does — nothing stays exactly where you put it.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1447752875215-b2761acb3c5d", true),
      alt: "Atmospheric charcoal landscape of a long field bordered by dark trees",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1477322524744-0eece9e79640", true),
        alt: "Detail of the field's furrows rendered in sweeping charcoal strokes",
      },
      tex.charcoalBlend,
      tex.chalkDust,
    ],
  },
  {
    _type: "artwork",
    slug: "first-light",
    title: "First Light",
    medium: "chalk",
    mediumLabel: "White chalk on black canvas",
    dimensions: "90 × 90 cm",
    year: 2024,
    price: 3900,
    available: true,
    featured: false,
    description:
      "Dawn over water, reduced to the fewest possible marks of chalk. The square format was borrowed from the view through my studio's east window, which is where this drawing effectively made itself.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1501854140801-50d01698950b"),
      alt: "Chalk drawing of first light breaking over a dark landscape on black canvas",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1505142468610-359e7d316be0", true),
        alt: "Detail of the water's surface built from horizontal chalk strokes",
      },
      tex.chalkDust,
      tex.paperEdge,
    ],
  },
  {
    _type: "artwork",
    slug: "the-ridge",
    title: "The Ridge",
    medium: "chalk",
    mediumLabel: "White chalk on black canvas",
    dimensions: "110 × 160 cm",
    year: 2023,
    price: 5200,
    available: true,
    featured: false,
    description:
      "The largest chalk piece I have made to date. Walked this ridgeline in County Kerry in fog, saw it for eleven seconds when the weather broke, and spent five months getting those eleven seconds down.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1433086966358-54859d0ed716", true),
      alt: "Large-scale chalk drawing of a mountain ridge and waterfall in white on black",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1526566661780-1a67ea3c863e", true),
        alt: "Detail of fog rolling through the ridgeline in layered chalk",
      },
      tex.chalkDust,
      tex.framedWork,
    ],
  },
  {
    _type: "artwork",
    slug: "winter-birch",
    title: "Winter Birch",
    medium: "ink",
    mediumLabel: "Sumi ink on washi paper",
    dimensions: "35 × 95 cm",
    year: 2023,
    price: 1900,
    available: false,
    featured: false,
    description:
      "Three birch trees in snow, drawn in a single sitting with sumi ink. The tall narrow format is traditional; the restraint it demands is the entire point.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1493246507139-91e8fad9978e", true),
      alt: "Tall narrow ink drawing of birch trees in winter mist",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1507041957456-9c397ce39c97", true),
        alt: "Detail of bare birch branches drawn in fine ink line",
      },
      tex.inkPooling,
      tex.inkBrush,
    ],
  },
  {
    _type: "artwork",
    slug: "bear-in-snow",
    title: "Bear in Snow",
    medium: "pencil",
    mediumLabel: "Pencil and white chalk on grey paper",
    dimensions: "55 × 70 cm",
    year: 2023,
    price: 2200,
    available: true,
    featured: false,
    description:
      "Drawn on mid-grey paper so the snow could be added rather than left — chalk for the highlights, pencil for everything the bear is thinking.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1564349683136-77e08dba1ef7", true),
      alt: "Pencil drawing of a bear resting in snow, with chalk highlights on grey paper",
    },
    details: [
      // TODO: replace with client photo
      {
        src: u("photo-1418065460487-3e41a6c84dc5", true),
        alt: "Detail of snow-laden branches surrounding the bear, in pencil and chalk",
      },
      tex.pencilHatch,
      tex.chalkDust,
    ],
  },
  {
    _type: "artwork",
    slug: "tiger-study",
    title: "Tiger Study",
    medium: "graphite",
    mediumLabel: "Graphite on Bristol board",
    dimensions: "60 × 80 cm",
    year: 2022,
    price: null,
    available: false,
    featured: false,
    description:
      "An early piece, and still the one collectors ask about most. Stripes without colour become pure rhythm — I have never enjoyed drawing anything more.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1557008075-7f2c5efa4cfd", true),
      alt: "Graphite study of a tiger walking through shallow water, in rich monochrome",
    },
    details: [tex.graphiteMacro, tex.pencilHatch, tex.framedWork],
  },
];

export const featuredArtworks = artworks.filter((a) => a.featured);
export const latestArtworks = [...artworks]
  .sort((a, b) => b.year - a.year)
  .slice(0, 6);

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export const mediums: { value: Medium; label: string }[] = [
  { value: "chalk", label: "Chalk" },
  { value: "graphite", label: "Graphite" },
  { value: "pencil", label: "Pencil" },
  { value: "charcoal", label: "Charcoal" },
  { value: "ink", label: "Ink" },
];

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export const journalPosts: JournalPost[] = [
  {
    _type: "journalPost",
    slug: "why-i-draw-on-black",
    title: "Why I Draw on Black",
    category: "Art Inspiration",
    date: "2026-06-14",
    excerpt:
      "Most drawings begin with darkness added to light. Mine begin the other way around — and that reversal changes everything about how a piece is made.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1494438639946-1ebd1d20bf85", true),
      alt: "Sheets of dark paper and white chalk arranged on a studio table",
    },
    body: [
      "Most drawings begin with darkness added to light: a pencil onto white paper, shadow by shadow, until the image arrives. Working in white chalk on black canvas reverses the entire process. The canvas begins as night. Every mark I make is a mark of light.",
      "It sounds like a small technical inversion. It is not. When you draw the light instead of the shadow, you stop describing objects and start describing how they are seen. A face is no longer a nose and two eyes — it is a cheekbone catching a window, the bright line along a jaw. Everything unnecessary simply stays black.",
      "I came to this way of working almost by accident, on an evening when the only paper left in the studio was a scrap of black mounting board. Ten years later, it is still how I think. The dark is not the absence of the drawing. The dark is most of the drawing.",
      "People sometimes ask whether working this way is slower. It is — enormously. Chalk cannot be erased from canvas without a ghost. Each highlight is a commitment. But I have come to believe the slowness is where the stillness in the finished work comes from. You cannot rush light.",
    ],
  },
  {
    _type: "journalPost",
    slug: "nocturne-series-in-progress",
    title: "The Nocturne Series, Halfway Through",
    category: "Work in Progress",
    date: "2026-05-02",
    excerpt:
      "Three of six pieces complete. Notes from the middle of the largest body of work I've attempted — where it began, and where it seems to be going without asking me.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1456086272160-b28b0645b729", true),
      alt: "Work in progress drawing clipped to a studio easel with chalk studies pinned beside it",
    },
    body: [
      "The Nocturne series began with a note I made two winters ago: six drawings of places at night that I have only seen in daylight. The idea was to draw the memory of a place, then subtract the sun.",
      "Three pieces are now finished. 'Stillness in White' went first and set the scale — larger than I usually work, which has turned out to matter. At a metre and a half wide, a chalk sky stops being an image of the sky and starts behaving like one. You stand in front of it rather than look at it.",
      "The fourth piece is on the easel now and it is misbehaving in interesting ways. I had planned a coastline; the drawing appears to have decided it is a field. After enough years you learn to lose these arguments early.",
      "The full series will be shown together next spring. Two of the six will be available for acquisition; the others are already spoken for. If you would like first viewing when the series is complete, the letter is the place to be.",
    ],
  },
  {
    _type: "journalPost",
    slug: "a-morning-in-the-studio",
    title: "A Morning in the Studio",
    category: "Studio Life",
    date: "2026-03-21",
    excerpt:
      "Coffee at six, north light by seven, chalk dust on everything by nine. An honest account of what an ordinary working day actually looks like.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1541367777708-7905fe3296c0", true),
      alt: "Morning light falling across a quiet artist's studio with drawings on the walls",
    },
    body: [
      "There is a myth that studios are romantic places, and a competing myth that they are workshops like any other. Mine is a former grain store with one enormous north-facing window, and it is both things at once, depending on the hour.",
      "The day starts at six with coffee and looking. Not drawing — looking. Whatever is on the easel gets half an hour of silent attention before I am allowed an opinion about it. More problems are solved in that half hour than in the whole rest of the day.",
      "By seven the north light is reliable and the actual work begins. Chalk work is physical in a way people don't expect: the large pieces are drawn standing, at arm's length, whole-arm movements, and by nine there is dust on everything I own, including the coffee.",
      "Afternoons are for the small disciplines — sharpening, stretching paper, photographing finished work, answering collectors. And at the end of every day, ten minutes of looking again. The drawing you leave at dusk is the drawing you find at dawn, but somehow it always has something new to say.",
    ],
  },
  {
    _type: "journalPost",
    slug: "on-drawing-animals",
    title: "On Drawing Animals",
    category: "Art Inspiration",
    date: "2026-02-08",
    excerpt:
      "An animal will not hold a pose, flatter you, or pretend. Which is precisely why they make the most honest portrait subjects I know.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1470116945706-e6bf5d5a53ca", true),
      alt: "A horse in soft monochrome light, reference imagery pinned in a sketchbook",
    },
    body: [
      "A human sitter arranges their face. They cannot help it; we all carry an idea of how we wish to be seen. An animal does no such thing. A horse in a field is only ever exactly what it is, and a drawing of it succeeds or fails on those terms alone.",
      "This is why animal portraiture, which is sometimes treated as the gentle end of fine art, is in my experience the most demanding work I take on. There is nowhere to hide. Get the set of a dog's shoulders wrong by a centimetre and its owner will feel the error before they can name it.",
      "The commissions that come through this studio are mostly of animals now, and most of those are elderly ones. People reach for a portrait when they begin to understand time is finite. It is an extraordinary thing to be trusted with, and I try to draw accordingly.",
      "My only rule: I draw from photographs of the animal at ease, never posed. The portrait should be of an ordinary moment — because the ordinary moments are the ones that will be missed.",
    ],
  },
  {
    _type: "journalPost",
    slug: "framing-chalk-works",
    title: "Behind the Glass: How the Chalk Works Are Framed",
    category: "Behind the Scenes",
    date: "2025-12-11",
    excerpt:
      "Chalk on canvas is beautiful and fragile in equal measure. A look at the museum-glass framing process every original goes through before it ships.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1513519245088-0e12902e5a38", true),
      alt: "A framed monochrome artwork hanging on a pale wall in an elegant interior",
    },
    body: [
      "Chalk does not fix the way graphite or charcoal does. Even sealed, a chalk surface remains slightly alive — which is part of its beauty and the whole of its fragility. So every chalk original that leaves this studio is framed before it ships, without exception.",
      "I work with a single framer, a two-person workshop forty minutes from the studio, and we have settled on one approach: a deep shadow-gap frame in blackened oak, spacers to hold the glazing well clear of the surface, and museum glass with 99% UV filtering.",
      "Museum glass matters more for this work than for most. Under ordinary glazing a black canvas becomes a mirror — you see the room, not the drawing. The anti-reflective coating makes the glass effectively vanish, and the darkness goes back to being darkness.",
      "It adds cost and a week to every delivery, and I have never once regretted it. The frame is not packaging. It is the last drawing decision.",
    ],
  },
  {
    _type: "journalPost",
    slug: "the-white-on-black-collection",
    title: "Introducing: The White on Black Collection",
    category: "New Collections",
    date: "2025-10-04",
    excerpt:
      "Five years of chalk-on-canvas work, gathered for the first time as a single collection — and thoughts on why this medium became the centre of the studio.",
    // TODO: replace with client photo
    image: {
      src: u("photo-1578321272176-b7bbc0679853", true),
      alt: "Gallery wall hung with a collection of framed monochrome works",
    },
    body: [
      "This month the studio's chalk-on-canvas works are gathered into a named collection for the first time: White on Black. It includes every major chalk piece from the last five years, from 'The Ridge' to the beginnings of the Nocturne series.",
      "Collections are, honestly, a device — the work was never made to a theme. But standing the pieces together revealed something I hadn't seen while making them one at a time: they are all, in some way, drawings of patience. Light arriving slowly at dark places.",
      "Several works in the collection remain available for acquisition, and each is listed in the gallery with its full provenance. The larger pieces I am glad to discuss by appointment, ideally in person — chalk work at scale simply does not photograph honestly.",
      "To everyone who has followed this work since the first small black scraps: the collection page is, quietly, for you. Thank you for a decade of letting me keep the lights off.",
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    _type: "testimonial",
    quote:
      "The portrait of our old greyhound arrived and my husband, who has not cried in the eleven years I've known him, left the room. It is him. Not a picture of him — him.",
    name: "Eleanor V.",
    context: "Pet portrait commission, 2025",
  },
  {
    _type: "testimonial",
    quote:
      "We acquired 'The Ridge' for our reading room and the space has never been the same. In the evening the drawing seems to hold the last of the light. Guests stop mid-sentence.",
    name: "Marcus & Ana D.",
    context: "Collectors, County Cork",
  },
  {
    _type: "testimonial",
    quote:
      "June guided us through our first ever art acquisition with extraordinary patience. The certificate, the framing, the delivery — every detail felt considered.",
    name: "Priya S.",
    context: "First-time collector, London",
  },
];

/* ------------------------------------------------------------------ */
/* Commissions                                                         */
/* ------------------------------------------------------------------ */

export const commissionCategories: CommissionCategory[] = [
  {
    _type: "commissionCategory",
    id: "portraits",
    title: "Portraits",
    description:
      "Graphite, charcoal or chalk portraits drawn from your photographs. Sittings can be arranged for collectors within Ireland.",
    startingPrice: "from €1,800",
    // TODO: replace with client photo
    image: {
      src: u("photo-1508214751196-bcfd4ca60f91", true),
      alt: "Monochrome portrait reference of a woman in soft window light",
    },
  },
  {
    _type: "commissionCategory",
    id: "wildlife",
    title: "Wildlife",
    description:
      "Studies of wild animals in graphite and charcoal — from single-subject portraits to large-scale chalk landscapes with figures.",
    startingPrice: "from €2,200",
    // TODO: replace with client photo
    image: {
      src: u("photo-1564760055775-d63b17a55c44", true),
      alt: "A leopard's face in dramatic monochrome light, a wildlife commission example",
    },
  },
  {
    _type: "commissionCategory",
    id: "pets",
    title: "Pets",
    description:
      "The studio's most beloved work. Portraits of companions drawn from candid photographs of ordinary moments — never posed.",
    startingPrice: "from €1,400",
    // TODO: replace with client photo
    image: {
      src: u("photo-1552053831-71594a27632d", true),
      alt: "Soft monochrome photograph of a young retriever tilting its head, a pet portrait example",
    },
  },
  {
    _type: "commissionCategory",
    id: "custom",
    title: "Custom Artwork",
    description:
      "Landscapes, houses, memories — if it matters to you, it can be drawn. Chalk on black canvas available for custom work at all sizes.",
    startingPrice: "priced on consultation",
    // TODO: replace with client photo
    image: {
      src: u("photo-1526566661780-1a67ea3c863e", true),
      alt: "Fog rolling over a dark mountain ridge, a custom commission example",
    },
  },
];

export const commissionSteps = [
  {
    title: "Inquiry",
    text: "Share what you have in mind through the form below — the subject, rough size, and any photographs you already have. There is no obligation at this stage.",
  },
  {
    title: "Consultation",
    text: "We speak by phone or video call. We'll settle on medium, scale, framing and timeline together, and I'll give you a fixed quote in writing.",
  },
  {
    title: "Sketch & Proof",
    text: "You receive a preparatory sketch for approval before the final piece begins. One round of revisions is always included.",
  },
  {
    title: "The Final Piece",
    text: "The drawing is completed in the studio — typically four to ten weeks depending on scale. You'll receive progress photographs at each milestone.",
  },
  {
    title: "Delivery",
    text: "The finished work is framed behind museum glass, accompanied by its Certificate of Authenticity, and shipped insured and tracked — worldwide.",
  },
];

/* ------------------------------------------------------------------ */
/* Contact / FAQ                                                       */
/* ------------------------------------------------------------------ */

export const faqs: FaqItem[] = [
  {
    _type: "faqItem",
    question: "How is artwork shipped?",
    answer:
      "Every original travels in a custom-built crate, fully insured and tracked, with worldwide delivery. Framed chalk works ship behind museum glass with the glazing braced clear of the surface. You'll receive tracking details the day the piece leaves the studio, and delivery typically takes 3–10 working days depending on destination.",
  },
  {
    _type: "faqItem",
    question: "Do the originals come framed?",
    answer:
      "Chalk-on-canvas works are always framed before shipping — the surface requires it — in blackened oak behind 99% UV museum glass. Works on paper can be acquired framed or unframed; unframed pieces ship flat between acid-free boards, ready for your own framer.",
  },
  {
    _type: "faqItem",
    question: "What is your approach to returns?",
    answer:
      "If a piece doesn't feel right once it's on your wall, you may return it within 14 days of delivery for a full refund of the acquisition price; return shipping and insurance are arranged by the studio. Commissioned work, being made for you, is not returnable — which is why the sketch-approval stage exists.",
  },
  {
    _type: "faqItem",
    question: "How long does a commission take?",
    answer:
      "From approved sketch to finished piece, most commissions take four to ten weeks depending on scale and medium; large chalk canvases can take longer. The current waitlist is roughly two months, and I take on a limited number of commissions each season so that nothing is rushed.",
  },
  {
    _type: "faqItem",
    question: "Is a Certificate of Authenticity included?",
    answer:
      "Yes — every original and every commission leaves the studio with a signed, numbered Certificate of Authenticity recording the title, medium, dimensions and year, along with care instructions for the specific medium.",
  },
  {
    _type: "faqItem",
    question: "How should I care for a chalk or charcoal work?",
    answer:
      "Keep the work out of direct sunlight and away from humidity — bathrooms and kitchens are unkind to works on paper. Never remove a chalk piece from its frame; the surface is delicate and the frame is engineered to protect it. A soft dry cloth on the glass is all the maintenance it should ever need.",
  },
];

/* ------------------------------------------------------------------ */
/* Instagram (static demo grid)                                        */
/* ------------------------------------------------------------------ */

export const instagramPosts: ArtworkImage[] = [
  // TODO: replace with client photos / live feed embed
  {
    src: u("photo-1456086272160-b28b0645b729", true),
    alt: "Hands sketching in a notebook beside a cup of coffee, studio morning",
  },
  {
    src: u("photo-1455390582262-044cdead277a", true),
    alt: "An ink pen mid-stroke across a page of studies",
  },
  {
    src: u("photo-1544967082-d9d25d867d66", true),
    alt: "Close-up of chalk texture across a dark surface",
  },
  {
    src: u("photo-1596548438137-d51ea5c83ca5", true),
    alt: "Artist's workbench with brushes, ink and tools in monochrome",
  },
  {
    src: u("photo-1502920917128-1aa500764cbd", true),
    alt: "Evening light in the studio, easel silhouetted against the window",
  },
  {
    src: u("photo-1461301214746-1e109215d6d3", true),
    alt: "Brushes and drawing tools gathered in jars by the studio window",
  },
];

/* ------------------------------------------------------------------ */
/* Site-wide bits                                                      */
/* ------------------------------------------------------------------ */

export const site = {
  name: "June's Studio",
  wordmark: "June’s Studio",
  tagline: "Original drawings in chalk, charcoal, graphite and ink",
  description:
    "The studio of June — an independent fine artist working in white chalk on black canvas, graphite, pencil, charcoal and ink. Original works and commissions.",
  email: "studio@junesstudio.art", // TODO: replace with client email
  instagram: "https://instagram.com", // TODO: replace with client profile
  pinterest: "https://pinterest.com", // TODO: replace with client profile
  aboutImages: {
    // TODO: replace with client photo
    portrait: {
      src: u("photo-1529665253569-6d01c0eaf7b6", true),
      alt: "Portrait of the artist June in her studio, in soft monochrome light",
    },
    // TODO: replace with client photo
    studioWide: {
      src: u("photo-1541367777708-7905fe3296c0", true),
      alt: "Wide view of June's studio with north light falling across the easel",
    },
    // TODO: replace with client photo
    hands: {
      src: u("photo-1456086272160-b28b0645b729", true),
      alt: "The artist's hands at work on a drawing",
    },
    // TODO: replace with client photo
    tools: {
      src: u("photo-1513364776144-60967b0f800f", true),
      alt: "Chalks, charcoal sticks and pencils laid out on the studio table",
    },
    // TODO: replace with client photo
    interior: {
      src: u("photo-1583847268964-b28dc8f51f92", true),
      alt: "A framed monochrome drawing hanging in an elegant, quiet interior",
    },
  },
};
