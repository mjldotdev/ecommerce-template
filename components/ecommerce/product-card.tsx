"use client";

import { Check, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import WishlistButton from "@/components/ecommerce/wishlist-button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  className?: string;
  priority?: boolean;
  product: Product;
}

export default function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginal = product.originalPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      return;
    }

    addItem(product, null);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={cn("group gsap-reveal", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image block */}
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[var(--surface)]">
        {/* Invisible link behind everything for keyboard + click navigation */}
        <Link
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-0"
          href={`/shop/${product.slug}` as `/shop/${string}`}
        />

        {/* Primary image */}
        <Image
          alt={product.name}
          className={cn(
            "pointer-events-none select-none object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            hovered && product.hoverImage
              ? "scale-105 opacity-0"
              : "scale-100 opacity-100 group-hover:scale-105"
          )}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={product.image}
        />

        {/* Hover image */}
        {product.hoverImage && (
          <Image
            alt={`${product.name} alternate view`}
            className={cn(
              "pointer-events-none select-none object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
            )}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={product.hoverImage}
          />
        )}

        {/* Wishlist — above the link layer */}
        <div className="absolute top-3 right-3 z-20">
          <WishlistButton product={product} />
        </div>

        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 bg-[var(--canvas)] px-3 py-1.5">
            <span className="text-[0.55rem] text-[var(--ink)] text-eyebrow">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick-add button — real button above the link, stops propagation */}
        <button
          aria-label={`Quick add ${product.name} to bag`}
          className={cn(
            "absolute right-0 bottom-0 left-0 z-10",
            "flex items-center justify-center gap-2 px-4 py-3",
            "transition-all duration-500",
            added
              ? "translate-y-0 bg-[var(--accent)] opacity-100"
              : "bg-[var(--ink)] hover:bg-[var(--accent)]",
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
          onClick={handleQuickAdd}
          type="button"
        >
          {added ? (
            <>
              <Check
                className="text-[var(--canvas)]"
                size={12}
                strokeWidth={2}
              />
              <span className="text-[0.6rem] text-[var(--canvas)] text-eyebrow">
                Added
              </span>
            </>
          ) : (
            <>
              <ShoppingBag
                className="text-[var(--canvas)]"
                size={12}
                strokeWidth={1.5}
              />
              <span className="text-[0.6rem] text-[var(--canvas)] text-eyebrow">
                Quick Add
              </span>
            </>
          )}
        </button>
      </div>

      {/* Info block — separate link */}
      <Link
        className="block"
        href={`/shop/${product.slug}` as `/shop/${string}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[var(--ink)] text-lg leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]">
              {product.name}
            </p>
            <p className="mt-0.5 text-[var(--ink-muted)] text-xs leading-relaxed">
              {product.subtitle}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="font-display text-[var(--ink)] text-base">
              {formattedPrice}
            </p>
            {formattedOriginal && (
              <p className="mt-0.5 text-[var(--ink-muted)] text-xs line-through">
                {formattedOriginal}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
