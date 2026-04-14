"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import ProductCard from "@/components/ecommerce/product-card";
import { products } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading reveal
      gsap.from(".fp-heading", {
        scrollTrigger: {
          trigger: ".fp-heading",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      // Product cards stagger
      gsap.from(".fp-card", {
        scrollTrigger: {
          trigger: ".fp-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="px-6 py-24 md:px-12 md:py-36" ref={sectionRef}>
      {/* Section header */}
      <div className="fp-heading mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
        <div>
          <span className="mb-4 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            New Arrivals
          </span>
          <h2 className="font-display text-[var(--ink)] text-display-lg">
            Carefully
            <br />
            <em>selected.</em>
          </h2>
        </div>
        <Link
          className="link-underline mb-2 self-start text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)] md:self-auto"
          href="/shop"
        >
          View all products
        </Link>
      </div>

      {/* Product grid — asymmetric layout */}
      <div className="fp-grid grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard
            className={`fp-card ${
              // Offset alternating cards vertically for editorial feel
              i % 2 === 1 ? "md:mt-16" : ""
            }`}
            key={product.id}
            priority={i < 2}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
