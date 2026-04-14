"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SlidersHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import ProductCard from "@/components/ecommerce/product-card";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

const allCategories = ["All", "Clothing", "Bags", "Objects", "Lighting"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".shop-header", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.1,
      });
      gsap.from(".shop-card", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.3,
      });
    },
    { scope: pageRef }
  );

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "Price: Low to High") {
      return a.price - b.price;
    }
    if (activeSort === "Price: High to Low") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div ref={pageRef}>
      <Navbar />

      <main className="min-h-screen px-6 pt-28 pb-24 md:px-12">
        {/* Page header */}
        <div className="shop-header border-[var(--border-color)] border-b pt-8 pb-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[var(--ink-muted)] text-eyebrow">
                {sorted.length} objects
              </p>
              <h1 className="font-display text-[var(--ink)] text-display-lg">
                The Shop
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
                  Sort:
                </span>
                <div className="flex gap-3">
                  {sortOptions.map((opt) => (
                    <button
                      className={cn(
                        "text-[0.6rem] text-eyebrow transition-colors duration-300",
                        activeSort === opt
                          ? "text-[var(--ink)]"
                          : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                      )}
                      key={opt}
                      onClick={() => setActiveSort(opt)}
                      type="button"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter toggle */}
              <button
                className="flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
                onClick={() => setFilterOpen(!filterOpen)}
                type="button"
              >
                {filterOpen ? <X size={12} /> : <SlidersHorizontal size={12} />}
                Filter
              </button>
            </div>
          </div>

          {/* Filter row */}
          <div
            className={cn(
              "mt-6 flex flex-wrap gap-3 overflow-hidden transition-all duration-500",
              filterOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {allCategories.map((cat) => (
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
        </div>

        {/* Products grid */}
        {sorted.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {sorted.map((product, i) => (
              <ProductCard
                className={cn("shop-card", i % 2 === 1 ? "md:mt-10" : "")}
                key={product.id}
                priority={i < 4}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="mb-4 font-display text-3xl text-[var(--ink-muted)] italic">
              Nothing here yet.
            </p>
            <button
              className="link-underline text-[0.6rem] text-[var(--accent)] text-eyebrow"
              onClick={() => setActiveCategory("All")}
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
