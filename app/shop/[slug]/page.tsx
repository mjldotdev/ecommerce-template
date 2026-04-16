"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useRef, useState } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";
import ProductCard from "@/components/ecommerce/product-card";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

const sizes = ["XS", "S", "M", "L", "XL"];
const materials = [
  { label: "Material", value: "Vegetable-tanned full-grain leather" },
  { label: "Origin", value: "Crafted in Tuscany, Italy" },
  { label: "Dimensions", value: "38 × 28 × 12 cm" },
  { label: "Care", value: "Leather conditioner recommended" },
];

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const pageRef = useRef<HTMLDivElement>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCart();

  const images = [
    product.image,
    product.hoverImage ?? product.image,
    product.image,
  ].filter(Boolean) as string[];

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(product.price);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".pdp-image", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "expo.inOut",
      })
        .from(
          ".pdp-img-inner",
          { scale: 1.1, duration: 1.8, ease: "expo.out" },
          "<"
        )
        .from(
          ".pdp-info > *",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
          },
          "-=0.8"
        );
    },
    { scope: pageRef }
  );

  const handleAdd = () => {
    // Shake the size selector if no size chosen for clothing
    if (sizes.length > 0 && !activeSize) {
      setSizeError(true);
      gsap.to(".size-selector", {
        x: [-6, 6, -5, 5, -3, 3, 0],
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => setSizeError(false),
      });
      return;
    }

    // Add `qty` copies (addItem increments by 1 each call)
    for (let i = 0; i < qty; i++) {
      addItem(product, activeSize);
    }

    setAdded(true);
    // Brief button feedback, then reset
    setTimeout(() => {
      setAdded(false);
      setQty(1);
    }, 2200);
  };

  return (
    <div ref={pageRef}>
      <Navbar />

      <main className="min-h-screen pt-24">
        {/* Back nav */}
        <div className="px-6 py-6 md:px-12">
          <Link
            className="group inline-flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
            href="/shop"
          >
            <ArrowLeft
              className="transition-transform duration-300 group-hover:-translate-x-1"
              size={12}
            />
            Back to Shop
          </Link>
        </div>

        {/* Main product grid */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Image column */}
          <div className="flex flex-col gap-3 px-6 pb-12 md:px-12 lg:px-12">
            {/* Primary image */}
            <div className="pdp-image relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
              <Image
                alt={product.name}
                className="pdp-img-inner object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                src={images[activeImg]}
              />
              {product.tag && (
                <div className="absolute top-5 left-5 bg-[var(--canvas)] px-3 py-1.5">
                  <span className="text-[0.55rem] text-[var(--ink)] text-eyebrow">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  className={cn(
                    "relative h-24 w-20 flex-shrink-0 overflow-hidden transition-all duration-300",
                    activeImg === i
                      ? "ring-1 ring-[var(--ink)] ring-offset-1"
                      : "opacity-50 hover:opacity-80"
                  )}
                  key={`thumb-${i}`}
                  onClick={() => setActiveImg(i)}
                  type="button"
                >
                  <Image
                    alt={`${product.name} view ${i + 1}`}
                    className="object-cover"
                    fill
                    sizes="80px"
                    src={img}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div className="pdp-info flex flex-col gap-7 px-6 pb-20 md:px-12 lg:pt-10 lg:pr-20 lg:pl-16 xl:pr-32">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
              <span>{product.category}</span>
              <span>·</span>
              {product.isNew && (
                <span className="text-[var(--accent)]">New Arrival</span>
              )}
            </div>

            {/* Name + price */}
            <div>
              <h1 className="font-display text-5xl text-[var(--ink)] leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-[var(--ink-muted)] text-sm">
                {product.subtitle}
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-display text-3xl text-[var(--ink)]">
                {formattedPrice}
              </span>
              {product.originalPrice && (
                <span className="font-display text-[var(--ink-muted)] text-xl line-through">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  }).format(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[var(--border-color)]" />

            {/* Size selector */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={cn(
                    "text-[0.6rem] text-eyebrow transition-colors duration-200",
                    sizeError ? "text-red-500" : "text-[var(--ink)]"
                  )}
                >
                  {sizeError ? "Please select a size" : "Select Size"}
                </span>
                <button
                  className="link-underline text-[0.6rem] text-[var(--ink-muted)] text-eyebrow"
                  type="button"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex size-selector flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    className={cn(
                      "h-12 w-12 border text-[0.65rem] text-eyebrow transition-all duration-300",
                      activeSize === size
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]"
                        : "border-[var(--border-color)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                    )}
                    key={size}
                    onClick={() => setActiveSize(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3">
              {/* Qty stepper */}
              <div className="flex items-center border border-[var(--border-color)]">
                <button
                  className="flex h-11 w-11 items-center justify-center text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)]"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  type="button"
                >
                  <Minus size={12} />
                </button>
                <span className="w-10 text-center font-display text-[var(--ink)] text-sm">
                  {qty}
                </span>
                <button
                  className="flex h-11 w-11 items-center justify-center text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)]"
                  onClick={() => setQty(qty + 1)}
                  type="button"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 py-3 text-[0.65rem] text-eyebrow transition-all duration-500",
                  added
                    ? "bg-[var(--accent)] text-[var(--canvas)]"
                    : "bg-[var(--ink)] text-[var(--canvas)] hover:bg-[var(--accent)]"
                )}
                onClick={handleAdd}
                type="button"
              >
                {added ? (
                  <>
                    <span>Added to Bag</span>
                    <span>✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={13} strokeWidth={1.5} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
              A singular object in the MAISON collection — made by hand, built
              to age beautifully. Each piece varies slightly in texture and
              character, bearing the marks of its making. That is not
              imperfection. That is authenticity.
            </p>

            {/* Details accordion-style list */}
            <div className="border-[var(--border-color)] border-t pt-6">
              <p className="mb-4 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                Details & Care
              </p>
              <dl className="flex flex-col gap-3">
                {materials.map((item) => (
                  <div className="flex justify-between gap-4" key={item.label}>
                    <dt className="w-24 flex-shrink-0 text-[var(--ink-muted)] text-xs">
                      {item.label}
                    </dt>
                    <dd className="text-right text-[var(--ink)] text-xs">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Shipping note */}
            <div className="flex items-start gap-3 bg-[var(--surface)] p-4">
              <span className="mt-0.5 text-[var(--accent)] text-base">◆</span>
              <p className="text-[var(--ink-muted)] text-xs leading-relaxed">
                Free shipping on orders over $400. Returns accepted within 14
                days of delivery. All items are QC-checked before dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className="border-[var(--border-color)] border-t px-6 py-24 md:px-12">
          <div className="mb-14 flex items-center justify-between">
            <h2 className="font-display text-[var(--ink)] text-display-md">
              You may also <em className="text-[var(--accent)]">like.</em>
            </h2>
            <Link
              className="link-underline text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
              href="/shop"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard
                className={i === 1 ? "md:mt-10" : ""}
                key={p.id}
                product={p}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
