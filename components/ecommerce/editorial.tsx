"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Editorial() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Parallax on image
      gsap.to(".editorial-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -80,
        ease: "none",
      });

      // Text reveal
      gsap.from(".editorial-text-block", {
        scrollTrigger: {
          trigger: ".editorial-text-block",
          start: "top 75%",
        },
        x: -40,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
      });

      // Number counter
      gsap.from(".editorial-number", {
        scrollTrigger: {
          trigger: ".editorial-number",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--surface)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — image */}
        <div className="relative h-[70vw] md:h-[90vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=90"
            alt="Atelier workshop"
            fill
            className="editorial-image object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Year badge */}
          <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full border border-[var(--canvas)]/40 flex items-center justify-center">
            <span className="text-[var(--canvas)] text-[0.55rem] font-display tracking-widest text-center leading-tight">
              EST<br />2019
            </span>
          </div>
        </div>

        {/* Right — editorial text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0">
          <div className="editorial-text-block">
            <span className="text-eyebrow text-[var(--ink-muted)] flex items-center gap-3 mb-10">
              <span className="block w-6 h-px bg-[var(--accent)]" />
              Our Atelier
            </span>

            <h2 className="text-display-md font-display text-[var(--ink)] mb-8">
              Craft over
              <br />
              <em className="text-[var(--accent)]">convenience.</em>
            </h2>

            <p className="text-[var(--ink-muted)] leading-relaxed mb-6 max-w-sm">
              Every object we carry is made by hand, in small batches, by makers
              who treat their craft as a lifelong pursuit — not a production line.
            </p>

            <p className="text-[var(--ink-muted)] leading-relaxed mb-12 max-w-sm">
              We visit each atelier. We understand each material. We say no
              to more than we say yes to.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-4 text-eyebrow text-[var(--ink)] group"
            >
              <span className="block w-10 h-px bg-[var(--accent)] group-hover:w-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              Read Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-20 pt-10 border-t border-[var(--border-color)]">
            {[
              { number: "12", label: "Artisans" },
              { number: "8", label: "Countries" },
              { number: "6yr", label: "Avg Partnership" },
            ].map((stat) => (
              <div key={stat.label} className="editorial-number">
                <p className="font-display text-3xl text-[var(--ink)]">{stat.number}</p>
                <p className="text-eyebrow text-[var(--ink-muted)] mt-1 text-[0.55rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}