import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-20 text-center">
      <p className="eyebrow">Not Found</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This wall is empty.</h1>
      <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-graphite">
        The page you’re looking for isn’t hanging here. The collection,
        however, is just through the next room.
      </p>
      <Link
        href="/gallery"
        className="mt-10 inline-flex items-center bg-ink px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-graphite"
      >
        View the Gallery
      </Link>
    </div>
  );
}
