"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import { articles, journalCategories } from "@/lib/journal-data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function JournalPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useGSAP(
    () => {
      gsap.from(".journal-header > *", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".featured-article", {
        scrollTrigger: { trigger: ".featured-article", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
      });

      gsap.from(".article-card", {
        scrollTrigger: { trigger: ".articles-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });
    },
    { scope: pageRef }
  );

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((a) => a.category === activeCategory);

  return (
    <div ref={pageRef}>
      <Navbar />

      <main className="min-h-screen pt-28 pb-24">
        {/* Header */}
        <div className="journal-header border-[var(--border-color)] border-b px-6 pt-8 pb-16 md:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-4 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
                <span className="block h-px w-6 bg-[var(--accent)]" />
                Notes from the Atelier
              </span>
              <h1 className="font-display text-[var(--ink)] text-display-lg">
                The Journal
              </h1>
            </div>
            <p className="max-w-xs text-[var(--ink-muted)] text-sm leading-relaxed">
              Essays, maker visits, material guides, and the occasional
              philosophical digression.
            </p>
          </div>
        </div>

        {/* Featured article — full width editorial */}
        {featured && (
          <Link
            className="featured-article group mx-6 mt-14 mb-20 block md:mx-12"
            href={`/journal/${featured.slug}`}
          >
            <div className="grid grid-cols-1 gap-0 border border-[var(--border-color)] md:grid-cols-5">
              {/* Image — 3 cols */}
              <div className="relative aspect-[16/9] overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[500px]">
                <Image
                  alt={featured.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  src={featured.image}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--canvas)]/20" />
              </div>

              {/* Text — 2 cols */}
              <div className="flex flex-col justify-between bg-[var(--surface)] p-8 md:col-span-2 md:p-12">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[0.55rem] text-[var(--accent)] text-eyebrow">
                      {featured.category}
                    </span>
                    <span className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                      · Featured
                    </span>
                  </div>
                  <h2 className="mb-6 font-display text-4xl text-[var(--ink)] leading-tight md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-[var(--border-color)] border-t pt-6">
                  <div>
                    <p className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                      By {featured.author}
                    </p>
                    <p className="mt-1 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                      {featured.date} · {featured.readTime} read
                    </p>
                  </div>
                  <ArrowRight
                    className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1"
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Category filter */}
        <div className="mb-12 flex flex-wrap gap-3 px-6 md:px-12">
          {journalCategories.map((cat) => (
            <button
              className={cn(
                "border px-4 py-2 text-[0.6rem] text-eyebrow transition-all duration-300",
                activeCategory === cat
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]"
                  : "border-[var(--border-color)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              )}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="articles-grid grid grid-cols-1 gap-x-6 gap-y-16 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <Link
              className={cn(
                "article-card group block",
                i === 1 ? "lg:mt-12" : i === 2 ? "lg:mt-6" : ""
              )}
              href={`/journal/${article.slug}`}
              key={article.id}
            >
              {/* Image */}
              <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                <Image
                  alt={article.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={article.image}
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-[var(--canvas)] px-3 py-1.5">
                  <span className="text-[0.55rem] text-[var(--ink)] text-eyebrow">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="mb-3 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                  {article.date} · {article.readTime} read
                </p>
                <h3 className="mb-3 font-display text-2xl text-[var(--ink)] leading-snug transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {article.title}
                </h3>
                <p className="line-clamp-3 text-[var(--ink-muted)] text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <p className="mt-4 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                  By {article.author}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more — placeholder */}
        {filtered.length >= 3 && (
          <div className="mt-20 flex justify-center">
            <button
              className="inline-flex items-center gap-3 border border-[var(--border-color)] px-8 py-4 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-all duration-300 hover:border-[var(--ink)] hover:text-[var(--ink)]"
              type="button"
            >
              Load more stories
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
