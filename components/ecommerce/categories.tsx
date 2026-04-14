"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading
      gsap.from(".cat-heading", {
        scrollTrigger: { trigger: ".cat-heading", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      // Category tiles — clip path reveal
      gsap.utils.toArray<HTMLElement>(".cat-tile").forEach((tile, i) => {
        gsap.from(tile, {
          scrollTrigger: {
            trigger: tile,
            start: "top 88%",
          },
          clipPath: "inset(100% 0 0 0)",
          duration: 1.4,
          delay: i * 0.08,
          ease: "expo.inOut",
        });

        // Inner image subtle scale
        const img = tile.querySelector(".cat-img");
        if (img) {
          gsap.from(img, {
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
            },
            scale: 1.1,
            duration: 1.8,
            delay: i * 0.08,
            ease: "expo.out",
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12">
      {/* Header */}
      <div className="cat-heading flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="text-eyebrow text-[var(--ink-muted)] flex items-center gap-3 mb-4">
            <span className="block w-6 h-px bg-[var(--accent)]" />
            Browse by Category
          </span>
          <h2 className="text-display-lg font-display text-[var(--ink)]">
            Find your
            <br />
            <em>intention.</em>
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-eyebrow text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-300 link-underline self-start md:self-auto mb-2"
        >
          All categories
        </Link>
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {/* Large feature tile */}
        <Link
          href={`/shop/${categories[0].slug}`}
          className="cat-tile col-span-2 row-span-2 relative aspect-[4/5] overflow-hidden group block"
        >
          <Image
            src={categories[0].image}
            alt={categories[0].name}
            fill
            className="cat-img object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-display text-[var(--canvas)] text-3xl italic">{categories[0].name}</p>
            <p className="text-eyebrow text-[var(--canvas)]/70 mt-1 text-[0.55rem]">
              {categories[0].count} products
            </p>
          </div>
        </Link>

        {/* Smaller tiles */}
        {categories.slice(1).map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.slug}`}
            className="cat-tile relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group block"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="cat-img object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-display text-[var(--canvas)] text-xl italic">{cat.name}</p>
              <p className="text-eyebrow text-[var(--canvas)]/70 mt-0.5 text-[0.55rem]">
                {cat.count} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}