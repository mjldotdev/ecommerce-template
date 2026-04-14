"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

  return (
    <Link
      className={cn("group gsap-reveal block", className)}
      href={`/shop/${product.slug}` as `/shop/${string}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[var(--surface)]">
        {/* Primary image */}
        <Image
          alt={product.name}
          className={cn(
            "object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
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
              "object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
            )}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={product.hoverImage}
          />
        )}

        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-4 left-4 bg-[var(--canvas)] px-3 py-1.5">
            <span className="text-[0.55rem] text-[var(--ink)] text-eyebrow">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 flex items-center justify-center bg-[var(--ink)] px-4 py-3 transition-all duration-500",
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        >
          <span className="text-[0.6rem] text-[var(--canvas)] text-eyebrow">
            Quick Add
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-[var(--ink)] text-lg leading-tight">
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
  );
}
