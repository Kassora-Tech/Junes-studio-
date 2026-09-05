/**
 * The icon set.
 *
 * One grammar throughout: a 24-unit box, a 1.25 hairline, butt caps, mitred
 * joins and no rounded corners anywhere — the same hairline weight as the
 * didone's thin strokes and the wall's rules. Every form is built from
 * straight lines and exact arcs on a 4-unit grid.
 *
 * Social platforms are set as words, not glyphs: redrawing another company's
 * mark by hand would break the grammar and misrepresent it.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "butt" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Direction — a hairline with a mitred head. Used for every forward link. */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </svg>
  );
}

/** Open — rotates to a cross when its disclosure opens. */
export function Plus({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12.5l5.5 5.5L20 6.5" />
    </svg>
  );
}

/**
 * Noted — the square a visitor marks against a work they are following.
 * Empty is a hairline square; marked fills with chalk. It is the same square
 * as the sold dot's opposite: a mark made by the visitor, not by the studio.
 */
export function Noted({ className, marked }: IconProps & { marked?: boolean }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6h12v12H6z" fill={marked ? "currentColor" : "none"} />
    </svg>
  );
}

/** Menu — two rules, the same hairline as everything else. */
export function Menu({ className, open }: IconProps & { open?: boolean }) {
  return (
    <svg {...base} className={className}>
      {open ? (
        <path d="M5 5l14 14M19 5L5 19" />
      ) : (
        <path d="M3 9h18M3 15h18" />
      )}
    </svg>
  );
}
