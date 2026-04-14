"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin();

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Eyebrow line fade in
      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      })
        // Main headline lines, staggered from below
        .from(
          ".hero-line",
          {
            y: "110%",
            duration: 1.4,
            stagger: 0.12,
            ease: "expo.out",
          },
          "-=0.6"
        )
        // Image reveal
        .from(
          ".hero-image-wrap",
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.6,
            ease: "expo.inOut",
          },
          "-=1.2"
        )
        // Image scale
        .from(
          ".hero-image",
          {
            scale: 1.15,
            duration: 1.8,
            ease: "expo.out",
          },
          "<"
        )
        // Bottom row
        .from(
          ".hero-bottom",
          {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-24 pb-12 md:px-12"
      ref={containerRef}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -z-10 h-full w-full bg-[var(--surface)] md:w-1/2"
      />

      {/* Main grid */}
      <div className="grid flex-1 grid-cols-12 items-center gap-x-4 md:gap-x-6">
        {/* Text column */}
        <div className="col-span-12 flex flex-col justify-center pt-12 md:col-span-6 md:pt-0 lg:col-span-5">
          {/* Eyebrow */}
          <div className="hero-eyebrow mb-8 flex items-center gap-3 md:mb-12">
            <span className="block h-px w-8 bg-[var(--accent)]" />
            <span className="text-[var(--ink-muted)] text-eyebrow">
              SS 2025 Collection
            </span>
          </div>

          {/* Headline */}
          <h1 aria-label="Objects of deliberate beauty">
            <div className="mb-1 overflow-hidden">
              <span className="hero-line block font-display text-[var(--ink)] text-display-xl italic">
                Objects
              </span>
            </div>
            <div className="mb-1 overflow-hidden">
              <span className="hero-line block font-display text-[var(--ink)] text-display-xl">
                of deliberate
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block font-display text-[var(--accent)] text-display-xl italic">
                beauty.
              </span>
            </div>
          </h1>

          {/* Descriptor */}
          <p className="hero-bottom mt-8 max-w-sm text-[var(--ink-muted)] text-base leading-relaxed md:mt-10">
            A curated collection of premium lifestyle objects — crafted for
            those who live deliberately.
          </p>

          {/* CTA row */}
          <div className="hero-bottom mt-10 flex items-center gap-6">
            <Link
              className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
              href="/shop"
            >
              Explore Collection
              <span className="block h-px w-0 overflow-hidden bg-current transition-all duration-500 group-hover:w-4" />
            </Link>
            <Link
              className="link-underline text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
              href="/about"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Image column */}
        <div className="col-span-12 mt-12 flex justify-end md:col-span-6 md:mt-0 lg:col-span-7">
          <div className="hero-image-wrap relative aspect-[3/4] w-full max-w-lg overflow-hidden lg:max-w-xl">
            <Image
              alt="SS 2025 Collection"
              className="hero-image object-cover object-top"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90"
            />
            {/* Overlay label */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-[var(--canvas)]/90 px-4 py-3 backdrop-blur-sm">
              <div>
                <p className="text-[0.6rem] text-[var(--ink)] text-eyebrow">
                  Featured
                </p>
                <p className="mt-0.5 font-display text-[var(--ink)] text-sm">
                  Merino Long Coat
                </p>
              </div>
              <p className="ml-4 font-display text-[var(--accent)] text-sm">
                $1,680
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="hero-bottom mt-10 grid grid-cols-3 gap-4 border-[var(--border-color)] border-t pt-8">
        {[
          { value: "48+", label: "New Arrivals" },
          { value: "12", label: "Artisan Makers" },
          { value: "100%", label: "Sustainably Sourced" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl text-[var(--ink)]">
              {stat.value}
            </p>
            <p className="mt-1 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
