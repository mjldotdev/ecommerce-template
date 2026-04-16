"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import ProductCard from "@/components/ecommerce/product-card";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { items, count } = useWishlist();

  useGSAP(
    () => {
      gsap.from(".wishlist-header > *", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".wl-card", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.4,
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <Navbar />
      <main className="min-h-screen px-6 pt-28 pb-24 md:px-12">
        {/* Header */}
        <div className="wishlist-header border-[var(--border-color)] border-b pt-8 pb-14">
          <div className="flex items-end justify-between">
            <div>
              <span className="mb-4 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
                <span className="block h-px w-6 bg-[var(--accent)]" />
                {count} {count === 1 ? "item" : "items"} saved
              </span>
              <h1 className="font-display text-[var(--ink)] text-display-lg">
                Wishlist
              </h1>
            </div>
            {count > 0 && (
              <Link
                className="link-underline mb-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
                href="/shop"
              >
                Continue Shopping
              </Link>
            )}
          </div>
        </div>

        {count === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-6 py-36 text-center">
            <Heart
              className="text-[var(--border-color)]"
              size={36}
              strokeWidth={1}
            />
            <div>
              <p className="mb-2 font-display text-2xl text-[var(--ink)] italic">
                Nothing saved yet.
              </p>
              <p className="max-w-xs text-[var(--ink-muted)] text-sm leading-relaxed">
                Use the heart icon on any product to save it here for later.
              </p>
            </div>
            <Link
              className="mt-2 inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
              href="/shop"
            >
              Explore the Shop
            </Link>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {items.map((product, i) => (
              <ProductCard
                className={`wl-card ${i % 2 === 1 ? "md:mt-10" : ""}`}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
