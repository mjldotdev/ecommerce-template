import Link from "next/link";
import Navbar from "@/components/ecommerce/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 flex items-center justify-center gap-3 text-[var(--ink-muted)] text-eyebrow">
          <span className="block h-px w-6 bg-[var(--accent)]" />
          404
          <span className="block h-px w-6 bg-[var(--accent)]" />
        </p>
        <h1 className="mb-6 font-display text-[var(--ink)] text-display-xl">
          Lost in
          <br />
          <em className="text-[var(--accent)]">the atelier.</em>
        </h1>
        <p className="mb-12 max-w-xs text-[var(--ink-muted)] leading-relaxed">
          The page you are looking for has moved, been archived, or never
          existed.
        </p>
        <Link
          className="inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
          href="/"
        >
          Return Home
        </Link>
      </main>
    </>
  );
}
