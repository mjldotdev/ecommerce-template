"use client";

import gsap from "gsap";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    itemCount,
    subtotal,
    removeItem,
    updateQty,
    closeCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(n);

  // Animate open/close
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!(drawer && overlay)) {
      return;
    }

    if (isOpen) {
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "auto",
      });
      gsap.to(drawer, { x: "0%", duration: 0.65, ease: "expo.out" });
    } else {
      gsap.to(drawer, { x: "100%", duration: 0.5, ease: "expo.in" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] bg-[var(--ink)]/40 opacity-0 backdrop-blur-sm"
        onClick={closeCart}
        ref={overlayRef}
      />

      {/* Drawer */}
      <aside
        aria-label="Shopping cart"
        aria-modal="true"
        className="fixed top-0 right-0 bottom-0 z-[70] flex w-full max-w-sm translate-x-full flex-col border-[var(--border-color)] border-l bg-[var(--canvas)]"
        ref={drawerRef}
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-[var(--border-color)] border-b px-7 py-6">
          <div className="flex items-center gap-3">
            <ShoppingBag
              className="text-[var(--ink)]"
              size={16}
              strokeWidth={1.5}
            />
            <span className="text-[var(--ink)] text-eyebrow">Your Bag</span>
            {itemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] font-medium text-[0.55rem] text-[var(--canvas)]">
                {itemCount}
              </span>
            )}
          </div>
          <button
            aria-label="Close cart"
            className="p-2 text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)]"
            onClick={closeCart}
            type="button"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <ShoppingBag
                className="text-[var(--border-color)]"
                size={32}
                strokeWidth={1}
              />
              <div>
                <p className="mb-2 font-display text-[var(--ink)] text-xl italic">
                  Your bag is empty.
                </p>
                <p className="text-[var(--ink-muted)] text-sm">
                  Add something considered.
                </p>
              </div>
              <button
                className="link-underline text-[0.6rem] text-[var(--accent)] text-eyebrow"
                onClick={closeCart}
                type="button"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-[var(--border-color)]">
              {items.map((item) => {
                const key = `${item.product.id}-${item.size}`;
                return (
                  <li className="flex gap-4 py-6" key={key}>
                    {/* Thumb */}
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-[var(--surface)]">
                      <Image
                        alt={item.product.name}
                        className="object-cover"
                        fill
                        sizes="80px"
                        src={item.product.image}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link
                            className="font-display text-[var(--ink)] text-base transition-colors duration-300 hover:text-[var(--accent)]"
                            href={`/shop/${item.product.slug}`}
                            onClick={closeCart}
                          >
                            {item.product.name}
                          </Link>
                          {item.size && (
                            <p className="mt-0.5 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        <p className="flex-shrink-0 font-display text-[var(--ink)] text-sm">
                          {fmt(item.product.price * item.quantity)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-[var(--border-color)]">
                          <button
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                            onClick={() =>
                              updateQty(
                                item.product.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            type="button"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-8 text-center font-display text-[var(--ink)] text-xs">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                            onClick={() =>
                              updateQty(
                                item.product.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            type="button"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <button
                          className="link-underline text-[0.55rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-200 hover:text-red-500"
                          onClick={() => removeItem(item.product.id, item.size)}
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {items.length > 0 && (
          <div className="flex flex-col gap-4 border-[var(--border-color)] border-t px-7 py-6">
            {/* Order summary */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[var(--ink-muted)] text-sm">
                <span>Subtotal</span>
                <span className="font-display text-[var(--ink)]">
                  {fmt(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[var(--ink-muted)] text-sm">
                <span>Shipping</span>
                <span className="text-[var(--accent)]">
                  {subtotal >= 400 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
            </div>

            {subtotal >= 400 && (
              <p className="text-center text-[0.55rem] text-[var(--accent)] text-eyebrow">
                ◆ Free shipping applied
              </p>
            )}

            {/* CTA */}
            <Link
              className="group flex w-full items-center justify-center gap-3 bg-[var(--ink)] py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
              href="/checkout"
              onClick={closeCart}
            >
              Proceed to Checkout
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={13}
              />
            </Link>

            <p className="text-center text-[0.6rem] text-[var(--ink-muted)]">
              Taxes calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
