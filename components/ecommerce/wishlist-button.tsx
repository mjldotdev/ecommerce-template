"use client";

import gsap from "gsap";
import { Heart } from "lucide-react";
import { useRef } from "react";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

interface WishlistButtonProps {
  className?: string;
  product: Product;
}

export default function WishlistButton({
  product,
  className,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = has(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // GSAP pop
    gsap
      .timeline()
      .to(btnRef.current, { scale: 0.75, duration: 0.12, ease: "power2.in" })
      .to(btnRef.current, { scale: 1.25, duration: 0.2, ease: "back.out(3)" })
      .to(btnRef.current, { scale: 1, duration: 0.15, ease: "power2.out" });

    toggle(product);
  };

  return (
    <button
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-8 w-8 items-center justify-center transition-colors duration-300",
        active
          ? "text-[var(--accent)]"
          : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
        className
      )}
      onClick={handleClick}
      ref={btnRef}
      type="button"
    >
      <Heart
        className={cn("transition-all duration-300", active && "fill-current")}
        size={15}
        strokeWidth={1.5}
      />
    </button>
  );
}
