"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import { products } from "@/lib/data";
import { articles } from "@/lib/journal-data";

type ResultType = "product" | "article";

interface SearchResult {
  href: string;
  id: string;
  image: string;
  subtitle: string;
  tag?: string;
  title: string;
  type: ResultType;
}

const allResults: SearchResult[] = [
  ...products.map((p) => ({
    id: p.id,
    type: "product" as ResultType,
    title: p.name,
    subtitle: p.subtitle,
    image: p.image,
    href: `/shop/${p.slug}`,
    tag: p.category,
  })),
  ...articles.map((a) => ({
    id: a.id,
    type: "article" as ResultType,
    title: a.title,
    subtitle: a.excerpt,
    image: a.image,
    href: `/journal/${a.slug}`,
    tag: a.category,
  })),
];

const trending = ["Linen", "Ceramics", "Leather", "SS 2025", "Objects"];

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) {
    return <>{text}</>;
  }
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) {
    return <>{text}</>;
  }
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-[var(--accent)]/20 px-0.5 text-[var(--accent)]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useGSAP(
    () => {
      gsap.from(".search-input-wrap", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".search-trending", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
      });
      // auto-focus
      setTimeout(() => inputRef.current?.focus(), 400);
    },
    { scope: pageRef }
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const q = query.toLowerCase();
    return allResults.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        (r.tag ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  const products_ = results.filter((r) => r.type === "product");
  const articles_ = results.filter((r) => r.type === "article");

  return (
    <div ref={pageRef}>
      <Navbar />
      <main className="min-h-screen px-6 pt-28 pb-24 md:px-12">
        {/* Search input */}
        <div className="search-input-wrap border-[var(--border-color)] border-b pt-12 pb-10">
          <div className="flex max-w-3xl items-center gap-4">
            <SearchIcon
              className="flex-shrink-0 text-[var(--ink-muted)]"
              size={20}
              strokeWidth={1.5}
            />
            <input
              aria-label="Search"
              className="flex-1 bg-transparent font-display text-[var(--ink)] text-display-md placeholder:text-[var(--border-color)] focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, journals, makers…"
              ref={inputRef}
              type="search"
              value={query}
            />
            {query && (
              <button
                className="text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors hover:text-[var(--ink)]"
                onClick={() => setQuery("")}
                type="button"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Trending — shown when no query */}
        {!query && (
          <div className="search-trending pt-10">
            <p className="mb-5 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
              Trending Searches
            </p>
            <div className="flex flex-wrap gap-3">
              {trending.map((term) => (
                <button
                  className="border border-[var(--border-color)] px-4 py-2.5 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-all duration-300 hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  key={term}
                  onClick={() => setQuery(term)}
                  type="button"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && results.length === 0 && (
          <div className="pt-20 text-center">
            <p className="mb-3 font-display text-2xl text-[var(--ink-muted)] italic">
              No results for "{query}"
            </p>
            <p className="text-[var(--ink-muted)] text-sm">
              Try a different term, or browse our collections.
            </p>
            <Link
              className="link-underline mt-6 inline-flex items-center gap-2 text-[0.6rem] text-[var(--accent)] text-eyebrow"
              href="/shop"
            >
              Browse all products
              <ArrowRight size={12} />
            </Link>
          </div>
        )}

        {query && results.length > 0 && (
          <div className="flex flex-col gap-16 pt-10">
            {/* Product results */}
            {products_.length > 0 && (
              <section>
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-[0.6rem] text-[var(--ink)] text-eyebrow">
                    Products
                    <span className="ml-2 text-[var(--ink-muted)]">
                      ({products_.length})
                    </span>
                  </p>
                  <Link
                    className="link-underline text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors hover:text-[var(--ink)]"
                    href="/shop"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
                  {products_.map((r) => (
                    <Link className="group block" href={r.href} key={r.id}>
                      <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-[var(--surface)]">
                        <Image
                          alt={r.title}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          src={r.image}
                        />
                        {r.tag && (
                          <div className="absolute top-3 left-3 bg-[var(--canvas)] px-2 py-1">
                            <span className="text-[0.5rem] text-[var(--ink)] text-eyebrow">
                              {r.tag}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="font-display text-[var(--ink)] text-base">
                        <Highlight query={query} text={r.title} />
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-[var(--ink-muted)] text-xs">
                        <Highlight query={query} text={r.subtitle} />
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Article results */}
            {articles_.length > 0 && (
              <section>
                <p className="mb-8 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                  Journal
                  <span className="ml-2 text-[var(--ink-muted)]">
                    ({articles_.length})
                  </span>
                </p>
                <div className="flex flex-col divide-y divide-[var(--border-color)]">
                  {articles_.map((r) => (
                    <Link
                      className="group -mx-4 flex items-center gap-5 px-4 py-5 transition-colors duration-300 hover:bg-[var(--surface)]"
                      href={r.href}
                      key={r.id}
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-[var(--surface)]">
                        <Image
                          alt={r.title}
                          className="object-cover"
                          fill
                          sizes="64px"
                          src={r.image}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-[0.55rem] text-[var(--accent)] text-eyebrow">
                          {r.tag}
                        </p>
                        <p className="font-display text-[var(--ink)] text-base leading-snug">
                          <Highlight query={query} text={r.title} />
                        </p>
                        <p className="mt-1 line-clamp-1 text-[var(--ink-muted)] text-xs">
                          <Highlight query={query} text={r.subtitle} />
                        </p>
                      </div>
                      <ArrowRight
                        className="flex-shrink-0 text-[var(--ink-muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                        size={14}
                        strokeWidth={1.5}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
