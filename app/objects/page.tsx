"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import ProductCard from "@/components/ecommerce/product-card";
import { products } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const objectProducts = products.filter(
  (p) => p.category === "Objects" || p.category === "Lighting"
);

const studioImages = [
  {
    src: "https://images.unsplash.com/photo-1612532978750-d6fb2e4c9dc2?w=900&q=85",
    caption: "Pour Vessel — Ash glaze",
  },
  {
    src: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
    caption: "Studio Lamp — Brass & linen",
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85",
    caption: "Terrazzo Tray — Small",
  },
];

export default function ObjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header
      gsap.from(".objects-header > *", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      });

      // Editorial banner
      gsap.from(".objects-banner", {
        scrollTrigger: { trigger: ".objects-banner", start: "top 80%" },
        clipPath: "inset(0 100% 0 0)",
        duration: 1.6,
        ease: "expo.inOut",
      });
      gsap.from(".objects-banner img", {
        scrollTrigger: { trigger: ".objects-banner", start: "top 80%" },
        scale: 1.1,
        duration: 2,
        ease: "expo.out",
      });

      // Studio images
      gsap.from(".studio-img", {
        scrollTrigger: { trigger: ".studio-row", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
      });

      // Product cards
      gsap.from(".obj-card", {
        scrollTrigger: { trigger: ".obj-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <Navbar />

      <main className="min-h-screen pt-28 pb-24">
        {/* Header */}
        <div className="objects-header px-6 pt-8 pb-16 md:px-12">
          <span className="mb-5 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            For Considered Living
          </span>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="font-display text-[var(--ink)] text-display-xl">
              Objects
            </h1>
            <p className="mb-2 max-w-xs text-[var(--ink-muted)] text-sm leading-relaxed">
              Things made to live with — not to display. Each object is chosen
              for its material honesty and its capacity to age with grace.
            </p>
          </div>
        </div>

        {/* Full-bleed editorial image */}
        <div className="objects-banner relative mx-6 mb-20 h-[60vh] overflow-hidden md:mx-12">
          <Image
            alt="Object collection editorial"
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1600&q=90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/50 to-transparent" />
          <div className="absolute bottom-10 left-10 md:left-14">
            <p className="font-display text-4xl text-[var(--canvas)] italic leading-tight md:text-5xl">
              Things that
              <br />
              outlast trends.
            </p>
          </div>
        </div>

        {/* Philosophy strip */}
        <div className="mb-20 border-[var(--border-color)] border-y bg-[var(--surface)] px-6 py-14 md:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                title: "Material Truth",
                body: "We do not carry objects made with composite materials pretending to be solid ones. Stone is stone. Brass is brass. Wood is wood.",
              },
              {
                title: "Made in Small Batches",
                body: "Every object is made in limited quantities, by hand, by a single maker or small studio. No production lines. No shortcuts.",
              },
              {
                title: "Age is Not Wear",
                body: "The objects we select improve with use. The brass patinates. The leather softens. The stoneware deepens. Time is not the enemy.",
              },
            ].map((item) => (
              <div className="flex flex-col gap-3" key={item.title}>
                <p className="font-display text-[var(--ink)] text-lg">
                  {item.title}
                </p>
                <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio photography row */}
        <div className="studio-row mb-24 px-6 md:px-12">
          <div className="mb-10 flex items-center gap-3">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            <span className="text-[var(--ink-muted)] text-eyebrow">
              In Situ
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {studioImages.map((img, i) => (
              <div
                className={`studio-img ${i === 1 ? "mt-8" : i === 2 ? "mt-4" : ""}`}
                key={img.caption}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]">
                  <Image
                    alt={img.caption}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 33vw, 25vw"
                    src={img.src}
                  />
                </div>
                <p className="mt-3 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="px-6 md:px-12">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-display text-[var(--ink)] text-display-md">
              Shop Objects
            </h2>
            <Link
              className="link-underline text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
              href="/shop"
            >
              View all
            </Link>
          </div>

          {objectProducts.length > 0 ? (
            <div className="obj-grid grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
              {objectProducts.map((product, i) => (
                <ProductCard
                  className={`obj-card ${i % 2 === 1 ? "md:mt-10" : ""}`}
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            // Fallback to all products if no Objects category matches
            <div className="obj-grid grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
              {products.slice(2, 6).map((product, i) => (
                <ProductCard
                  className={`obj-card ${i % 2 === 1 ? "md:mt-10" : ""}`}
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
