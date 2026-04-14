"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useRef } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import { articles } from "@/lib/journal-data";

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);

  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const pageRef = useRef<HTMLDivElement>(null);
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prev = articles[currentIndex - 1];
  const next = articles[currentIndex + 1];

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".article-hero-img", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.6,
        ease: "expo.inOut",
      })
        .from(
          ".article-hero-img img",
          { scale: 1.1, duration: 2, ease: "expo.out" },
          "<"
        )
        .from(
          ".article-meta > *",
          { y: 20, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" },
          "-=0.8"
        )
        .from(
          ".article-body > *",
          { y: 20, opacity: 0, duration: 1, stagger: 0.06, ease: "expo.out" },
          "-=0.6"
        );
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <Navbar />

      <main className="pt-24">
        {/* Back nav */}
        <div className="px-6 py-6 md:px-12">
          <Link
            className="group inline-flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
            href="/journal"
          >
            <ArrowLeft
              className="transition-transform duration-300 group-hover:-translate-x-1"
              size={12}
            />
            The Journal
          </Link>
        </div>

        {/* Article header */}
        <div className="max-w-4xl px-6 py-12 md:px-12">
          <div className="article-meta">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[0.6rem] text-[var(--accent)] text-eyebrow">
                {article.category}
              </span>
              <span className="text-[var(--border-color)]">·</span>
              <span className="text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
                {article.date}
              </span>
              <span className="text-[var(--border-color)]">·</span>
              <span className="text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
                {article.readTime} read
              </span>
            </div>
            <h1 className="mb-6 font-display text-[var(--ink)] text-display-lg">
              {article.title}
            </h1>
            <p className="mb-8 max-w-xl text-[var(--ink-muted)] text-lg leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 border-[var(--border-color)] border-b pb-10">
              <div className="h-8 w-8 rounded-full border border-[var(--border-color)] bg-[var(--surface)]" />
              <div>
                <p className="text-[var(--ink)] text-sm">{article.author}</p>
                <p className="mt-0.5 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                  M.dev Editorial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="article-hero-img relative mx-0 mb-16 aspect-[21/9] overflow-hidden md:mx-12">
          <Image
            alt={article.title}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={article.image}
          />
        </div>

        {/* Article body — editorial prose layout */}
        <div className="article-body prose-editorial mx-auto max-w-3xl px-6 pb-24 md:px-12">
          {/* Drop cap first paragraph */}
          <p className="mb-7 text-[var(--ink)] text-base leading-[1.85] first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:text-[var(--accent)] first-letter:leading-none">
            There is a particular quality of silence in a craft workshop — not
            the silence of emptiness, but of sustained concentration. The
            saddler does not look up when we enter. His hands continue their
            work: a curved needle drawing linen thread through thick leather
            with a tension he has spent forty years calibrating. We learn, in
            the first hour, that interruptions are welcomed but not sought.
          </p>

          <p className="mb-7 text-[var(--ink)] text-base leading-[1.85]">
            His name is not important to him. "The work has a name," he tells us
            through our translator. "A saddle has a name. I am just the person
            who happened to make it." It is not false modesty — it is the
            orientation of a man whose identity has been completely absorbed
            into his craft over decades. We find it not sad but extraordinary.
          </p>

          {/* Pull quote */}
          <blockquote className="my-12 border-[var(--accent)] border-l-2 pl-8">
            <p className="font-display text-2xl text-[var(--ink)] italic leading-snug md:text-3xl">
              "The first ten years, you are learning the material. The second
              ten, you are learning your hands. After that, you stop thinking
              and start making."
            </p>
            <footer className="mt-4 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
              — The Saddler, Florence
            </footer>
          </blockquote>

          <p className="mb-7 text-[var(--ink)] text-base leading-[1.85]">
            We ask him about patience — whether it is something he has always
            had, or something the work gave him. He considers the question for
            long enough that we wonder if he has heard it. Then: "Patience is
            the wrong word. Patience suggests waiting for something to end. I am
            not waiting. I am exactly where I want to be, doing exactly what I
            want to do. That is not patience — that is luck."
          </p>

          <p className="mb-7 text-[var(--ink)] text-base leading-[1.85]">
            The things he makes will last between fifty and one hundred years
            with proper care. He has made saddles that have been ridden by three
            generations of the same family. He knows this not because they write
            to tell him — they do not — but because occasionally a saddle comes
            back for repair and he recognizes his own stitching from decades
            prior. "It is like meeting an old friend," he says. "One who has
            lived a fuller life than me."
          </p>

          {/* Inline image */}
          <figure className="my-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt="Leather tools"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85"
              />
            </div>
            <figcaption className="mt-3 text-center text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
              Tools used in the workshop, some more than sixty years old.
            </figcaption>
          </figure>

          <p className="mb-7 text-[var(--ink)] text-base leading-[1.85]">
            We leave the workshop in the late afternoon with two things: a
            commission placed for a small leather notebook cover that will take
            six months to complete, and a quietly altered sense of what the word
            "quality" actually means. It does not mean expensive. It does not
            mean rare. It means: made with enough care that time improves rather
            than diminishes it. That is a standard almost nothing meets. Almost
            nothing. But some things do.
          </p>

          {/* Tags */}
          <div className="mt-14 flex flex-wrap gap-2 border-[var(--border-color)] border-t pt-10">
            {["Craft", "Florence", "Leather", "Makers", "Slow Living"].map(
              (tag) => (
                <span
                  className="border border-[var(--border-color)] px-3 py-1.5 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow"
                  key={tag}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-1 border-[var(--border-color)] border-t px-6 md:grid-cols-2 md:px-12">
          {prev ? (
            <Link
              className="group -mx-6 flex flex-col gap-2 border-[var(--border-color)] border-b px-6 py-10 pr-8 pl-6 transition-colors duration-300 hover:bg-[var(--surface)] md:-mx-12 md:border-r md:border-b-0 md:px-12 md:pl-12"
              href={`/journal/${prev.slug}`}
            >
              <div className="flex items-center gap-2 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                <ArrowLeft
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                  size={10}
                />
                Previous
              </div>
              <p className="font-display text-[var(--ink)] text-xl">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              className="group -mx-6 flex flex-col gap-2 px-6 py-10 text-right transition-colors duration-300 hover:bg-[var(--surface)] md:-mr-12 md:ml-0 md:px-12"
              href={`/journal/${next.slug}`}
            >
              <div className="flex items-center justify-end gap-2 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                Next
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={10}
                />
              </div>
              <p className="font-display text-[var(--ink)] text-xl">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
