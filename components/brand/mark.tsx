/**
 * The identity.
 *
 * The J is drawn here as bezier outlines rather than set in a typeface — a
 * didone J with a hairline top serif, a thick stem and a thin-terminalled
 * hook, constructed on a 100-unit cap height. The name beside it is set as a
 * tracked descriptor, the way a gallery sets its own name beside its mark.
 */

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 106"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      {/* hairline top serif */}
      <path d="M20 0h39v4.2H20z" />
      {/* stem into the hook: down the right edge, round the bowl, back up
          the inside — one contour, thick to thin, as a didone J turns */}
      <path d="M32 0h15v66c0 15.6-3.1 25.2-9.6 30.7-4.4 3.7-10 5.5-16.7 5.5-7.6 0-13.7-2.4-18.1-7.2C-1.4 90.5-3 84.4-2.7 76.9L11 76.4c-.2 5.1.7 8.9 2.7 11.3 1.8 2.2 4.4 3.3 7.8 3.3 3.9 0 6.7-1.4 8.4-4.1 1.4-2.3 2.1-6.1 2.1-11.5V0Z" />
    </svg>
  );
}

export function Wordmark({
  className,
  monoClass = "h-6 w-auto sm:h-7",
}: {
  className?: string;
  monoClass?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className ?? ""}`}>
      <Monogram className={`${monoClass} shrink-0 translate-y-[0.12em]`} />
      <span className="font-sans text-[0.6875rem] font-medium uppercase leading-none tracking-[0.28em]">
        June’s Studio
      </span>
    </span>
  );
}
