"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Navbar from "@/components/ecommerce/navbar";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

type Step = "contact" | "shipping" | "payment" | "confirmation";

const steps: { id: Step; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

const countries = [
  "United Kingdom",
  "United States",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Japan",
  "Australia",
  "Other",
];

const shippingOptions = [
  { id: "standard", label: "Standard", eta: "5–8 business days", price: 18 },
  { id: "express", label: "Express", eta: "2–3 business days", price: 35 },
  { id: "overnight", label: "Overnight", eta: "Next business day", price: 65 },
];

export default function CheckoutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("contact");
  const [shipping, setShipping] = useState("standard");

  const shippingCost =
    subtotal >= 400
      ? 0
      : (shippingOptions.find((o) => o.id === shipping)?.price ?? 18);
  const total = subtotal + shippingCost;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(n);

  useGSAP(
    () => {
      gsap.from(".checkout-panel", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });
    },
    { scope: pageRef }
  );

  const animateStep = (next: Step) => {
    gsap.to(".checkout-form", {
      x: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setStep(next);
        gsap.fromTo(
          ".checkout-form",
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "expo.out" }
        );
      },
    });
  };

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  if (step === "confirmation") {
    return (
      <div ref={pageRef}>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-6 pt-28 pb-24">
          <div className="checkout-panel flex w-full max-w-md flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)]/10">
              <Check
                className="text-[var(--accent)]"
                size={24}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h1 className="mb-3 font-display text-4xl text-[var(--ink)] italic">
                Order placed.
              </h1>
              <p className="mx-auto max-w-xs text-[var(--ink-muted)] text-sm leading-relaxed">
                Thank you. A confirmation has been sent to your email. Your
                order will be dispatched within 1–2 business days.
              </p>
            </div>
            <div className="w-full bg-[var(--surface)] px-8 py-6 text-left">
              <p className="mb-3 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                Order Summary
              </p>
              {items.map((item) => (
                <div
                  className="flex justify-between py-1 text-[var(--ink-muted)] text-sm"
                  key={`${item.product.id}-${item.size}`}
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-display text-[var(--ink)]">
                    {fmt(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="mt-3 flex justify-between border-[var(--border-color)] border-t pt-3">
                <span className="text-[0.6rem] text-[var(--ink)] text-eyebrow">
                  Total
                </span>
                <span className="font-display text-[var(--ink)]">
                  {fmt(total)}
                </span>
              </div>
            </div>
            <Link
              className="inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
              href="/shop"
              onClick={clearCart}
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div ref={pageRef}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <div className="checkout-panel mx-auto max-w-6xl px-6 pt-8 md:px-12">
          {/* Header */}
          <div className="mb-10">
            <Link
              className="group mb-6 inline-flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors hover:text-[var(--ink)]"
              href="/shop"
            >
              <ArrowLeft
                className="transition-transform duration-300 group-hover:-translate-x-1"
                size={12}
              />
              Back to Shop
            </Link>
            <h1 className="font-display text-4xl text-[var(--ink)]">
              Checkout
            </h1>
          </div>

          {/* Step progress */}
          <div className="mb-12 flex items-center gap-0">
            {steps.map((s, i) => (
              <div className="flex items-center" key={s.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full font-medium text-[0.55rem] transition-all duration-500",
                      i < currentStepIndex
                        ? "bg-[var(--accent)] text-[var(--canvas)]"
                        : i === currentStepIndex
                          ? "bg-[var(--ink)] text-[var(--canvas)]"
                          : "bg-[var(--border-color)] text-[var(--ink-muted)]"
                    )}
                  >
                    {i < currentStepIndex ? <Check size={10} /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-[0.6rem] text-eyebrow transition-colors duration-300",
                      i === currentStepIndex
                        ? "text-[var(--ink)]"
                        : "text-[var(--ink-muted)]"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-3 h-px w-12 transition-all duration-700 md:w-20",
                      i < currentStepIndex
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--border-color)]"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Two-column: form + order summary */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <div className="checkout-form lg:col-span-3">
              {/* ── Contact step ── */}
              {step === "contact" && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl text-[var(--ink)]">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {[
                      {
                        id: "firstName",
                        label: "First name",
                        type: "text",
                        placeholder: "Elsa",
                      },
                      {
                        id: "lastName",
                        label: "Last name",
                        type: "text",
                        placeholder: "Verne",
                      },
                    ].map((f) => (
                      <div className="flex flex-col gap-2" key={f.id}>
                        <label
                          className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                          htmlFor={f.id}
                        >
                          {f.label}
                        </label>
                        <input
                          className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                          id={f.id}
                          placeholder={f.placeholder}
                          type={f.type}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="phone"
                    >
                      Phone (optional)
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="phone"
                      placeholder="+1 000 000 0000"
                      type="tel"
                    />
                  </div>
                  <label className="group flex cursor-pointer items-start gap-3">
                    <div className="mt-0.5 h-4 w-4 flex-shrink-0 border border-[var(--border-color)] transition-colors group-hover:border-[var(--ink)]" />
                    <span className="text-[var(--ink-muted)] text-xs leading-relaxed">
                      Keep me updated on new arrivals and exclusive offers. No
                      spam — ever.
                    </span>
                  </label>
                  <button
                    className="group mt-2 inline-flex items-center gap-3 self-end bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
                    onClick={() => animateStep("shipping")}
                    type="button"
                  >
                    Continue to Shipping
                    <ArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      size={13}
                    />
                  </button>
                </div>
              )}

              {/* ── Shipping step ── */}
              {step === "shipping" && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl text-[var(--ink)]">
                    Shipping Address
                  </h2>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="address"
                    >
                      Street address
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="address"
                      placeholder="14 Rue du Faubourg"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="address2"
                    >
                      Apartment, suite (optional)
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="address2"
                      placeholder="Apt 4B"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                        id="city"
                        placeholder="Paris"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                        htmlFor="postal"
                      >
                        Postal code
                      </label>
                      <input
                        className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                        id="postal"
                        placeholder="75001"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <select
                      className="appearance-none border border-[var(--border-color)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 focus:border-[var(--ink)] focus:outline-none"
                      id="country"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Shipping options */}
                  <div className="mt-2">
                    <p className="mb-4 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                      Delivery Method
                    </p>
                    <div className="flex flex-col gap-2">
                      {shippingOptions.map((opt) => (
                        <label
                          className={cn(
                            "flex cursor-pointer items-center justify-between border p-4 transition-all duration-300",
                            shipping === opt.id
                              ? "border-[var(--ink)] bg-[var(--surface)]"
                              : "border-[var(--border-color)] hover:border-[var(--ink-muted)]"
                          )}
                          key={opt.id}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300",
                                shipping === opt.id
                                  ? "border-[var(--ink)] bg-[var(--ink)]"
                                  : "border-[var(--border-color)]"
                              )}
                            />
                            <div>
                              <p className="text-[var(--ink)] text-sm">
                                {opt.label}
                              </p>
                              <p className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                                {opt.eta}
                              </p>
                            </div>
                          </div>
                          <p className="font-display text-[var(--ink)] text-sm">
                            {subtotal >= 400 ? (
                              <span className="text-[var(--accent)]">Free</span>
                            ) : (
                              fmt(opt.price)
                            )}
                          </p>
                          <input
                            checked={shipping === opt.id}
                            className="sr-only"
                            name="shipping"
                            onChange={() => setShipping(opt.id)}
                            type="radio"
                            value={opt.id}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <button
                      className="group inline-flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors hover:text-[var(--ink)]"
                      onClick={() => animateStep("contact")}
                      type="button"
                    >
                      <ArrowLeft
                        className="transition-transform group-hover:-translate-x-1"
                        size={12}
                      />
                      Back
                    </button>
                    <button
                      className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
                      onClick={() => animateStep("payment")}
                      type="button"
                    >
                      Continue to Payment
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-1"
                        size={13}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Payment step ── */}
              {step === "payment" && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl text-[var(--ink)]">
                    Payment
                  </h2>
                  <div className="flex items-center gap-2 border border-[var(--border-color)] bg-[var(--surface)] p-3">
                    <Lock
                      className="text-[var(--accent)]"
                      size={12}
                      strokeWidth={1.5}
                    />
                    <p className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                      All transactions are encrypted and processed securely.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="cardName"
                    >
                      Name on card
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="cardName"
                      placeholder="Elsa Verne"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="cardNum"
                    >
                      Card number
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 font-mono text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="cardNum"
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                        htmlFor="expiry"
                      >
                        Expiry date
                      </label>
                      <input
                        className="border border-[var(--border-color)] bg-transparent px-4 py-3 font-mono text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                        id="expiry"
                        maxLength={7}
                        placeholder="MM / YY"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                        htmlFor="cvc"
                      >
                        CVC
                      </label>
                      <input
                        className="border border-[var(--border-color)] bg-transparent px-4 py-3 font-mono text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                        id="cvc"
                        maxLength={4}
                        placeholder="000"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="promo"
                    >
                      Promo code (optional)
                    </label>
                    <div className="flex gap-0">
                      <input
                        className="flex-1 border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm uppercase transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                        id="promo"
                        placeholder="MAISON10"
                        type="text"
                      />
                      <button
                        className="border border-[var(--border-color)] border-l-0 px-5 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:border-[var(--ink)] hover:text-[var(--ink)]"
                        type="button"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <button
                      className="group inline-flex items-center gap-2 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow transition-colors hover:text-[var(--ink)]"
                      onClick={() => animateStep("shipping")}
                      type="button"
                    >
                      <ArrowLeft
                        className="transition-transform group-hover:-translate-x-1"
                        size={12}
                      />
                      Back
                    </button>
                    <button
                      className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent-warm)]"
                      onClick={() => setStep("confirmation")}
                      type="button"
                    >
                      <Lock size={13} strokeWidth={1.5} />
                      Place Order — {fmt(total)}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <aside className="lg:col-span-2">
              <div className="sticky top-28 flex flex-col gap-6">
                <h3 className="text-[0.6rem] text-[var(--ink)] text-eyebrow">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="flex flex-col divide-y divide-[var(--border-color)] border border-[var(--border-color)]">
                  {items.map((item) => (
                    <div
                      className="flex gap-4 p-4"
                      key={`${item.product.id}-${item.size}`}
                    >
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-[var(--surface)]">
                        <Image
                          alt={item.product.name}
                          className="object-cover"
                          fill
                          sizes="64px"
                          src={item.product.image}
                        />
                        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ink)] text-[0.5rem] text-[var(--canvas)]">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display text-[var(--ink)] text-sm">
                            {item.product.name}
                          </p>
                          {item.size && (
                            <p className="mt-0.5 text-[0.5rem] text-[var(--ink-muted)] text-eyebrow">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        <p className="font-display text-[var(--ink)] text-sm">
                          {fmt(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex justify-between text-[var(--ink-muted)] text-sm">
                    <span>Subtotal</span>
                    <span className="font-display text-[var(--ink)]">
                      {fmt(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[var(--ink-muted)] text-sm">
                    <span>Shipping</span>
                    <span className="font-display text-[var(--ink)]">
                      {shippingCost === 0 ? (
                        <span className="text-[var(--accent)]">Free</span>
                      ) : (
                        fmt(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-[var(--border-color)] border-t pt-3">
                    <span className="text-[0.6rem] text-[var(--ink)] text-eyebrow">
                      Total
                    </span>
                    <span className="font-display text-[var(--ink)] text-xl">
                      {fmt(total)}
                    </span>
                  </div>
                </div>

                {/* Reassurances */}
                <div className="flex flex-col gap-2 pt-2">
                  {[
                    "Secure 256-bit SSL encryption",
                    "Free returns within 14 days",
                    "Dispatched within 1–2 business days",
                  ].map((item) => (
                    <div className="flex items-center gap-2" key={item}>
                      <Check
                        className="flex-shrink-0 text-[var(--accent)]"
                        size={10}
                        strokeWidth={2}
                      />
                      <span className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
