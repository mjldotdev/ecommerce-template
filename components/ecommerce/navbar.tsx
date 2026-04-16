"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

gsap.registerPlugin();

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Objects", href: "/objects" },
  { label: "Journal", href: "/journal" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.2,
        clearProps: "opacity,transform",
      });
    },
    { scope: navRef }
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-700",
          scrolled
            ? "border-[var(--border-color)] border-b bg-[var(--canvas)]/80 py-4 backdrop-blur-md"
            : "py-6"
        )}
        ref={navRef}
      >
        <div className="mx-auto flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            className="mr-24 font-display font-medium text-[1.35rem] text-[var(--ink)] tracking-tight transition-colors duration-300 hover:text-[var(--accent)]"
            href="/"
          >
            <em>M.</em>
            <span className="text-[var(--accent)] not-italic">dev</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="link-underline text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
                  href={
                    link.href as
                      | "/shop"
                      | "/collections"
                      | "/objects"
                      | "/journal"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            {mounted && (
              <button
                aria-label="Toggle theme"
                className="p-2 text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                type="button"
              >
                {theme === "dark" ? (
                  <Sun size={16} strokeWidth={1.5} />
                ) : (
                  <Moon size={16} strokeWidth={1.5} />
                )}
              </button>
            )}

            {/* Search */}
            <Link
              aria-label="Search"
              className="p-2 text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
              href="/search"
            >
              <Search size={16} strokeWidth={1.5} />
            </Link>

            {/* Wishlist */}
            <Link
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative p-2 text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
              href="/wishlist"
            >
              <Heart size={16} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--accent)] font-medium text-[0.45rem] text-[var(--canvas)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              aria-label={`Shopping bag, ${itemCount} items`}
              className="relative p-2 text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
              onClick={toggleCart}
              type="button"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {itemCount > 0 ? (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] font-medium text-[0.5rem] text-[var(--canvas)]">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label="Menu"
              className="p-2 text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)] md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              {menuOpen ? (
                <X size={16} strokeWidth={1.5} />
              ) : (
                <Menu size={16} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--canvas)] transition-all duration-700",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="font-display text-[var(--ink)] text-display-md italic transition-colors duration-300 hover:text-[var(--accent)]"
                href={
                  link.href as
                    | "/shop"
                    | "/collections"
                    | "/objects"
                    | "/journal"
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
