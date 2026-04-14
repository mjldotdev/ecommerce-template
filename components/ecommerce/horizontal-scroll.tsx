"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import ProductCard from "@/components/ecommerce/product-card";
import { products } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!(section && track)) {
        return;
      }

      const cards = track.querySelectorAll(".hscroll-card");
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalScroll = trackWidth - viewportWidth;

      if (totalScroll <= 0) {
        return;
      }

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle opacity stagger as cards enter view
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.04,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="relative overflow-hidden" ref={sectionRef}>
      {/* Sticky header */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex items-end justify-between px-6 pt-12 pb-8 md:px-12">
        <div>
          <span className="mb-3 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            Complete the Look
          </span>
          <h2 className="font-display text-[var(--ink)] text-display-md">
            More to <em className="text-[var(--accent)]">discover.</em>
          </h2>
        </div>
        <span className="mb-1 hidden text-[var(--ink-muted)] text-eyebrow md:block">
          Scroll to explore →
        </span>
      </div>

      {/* Horizontal track */}
      <div className="pt-40 pb-16">
        <div className="flex w-max gap-5 pr-16 pl-6 md:pl-12" ref={trackRef}>
          {products.map((product, i) => (
            <div
              className={`hscroll-card w-72 flex-shrink-0 md:w-80 ${
                i % 3 === 1 ? "mt-14" : i % 3 === 2 ? "mt-7" : ""
              }`}
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
