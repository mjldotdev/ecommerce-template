"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".nl-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      })
        .from(
          ".nl-headline span",
          {
            y: "110%",
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .from(
          ".nl-body",
          { y: 20, opacity: 0, duration: 1, ease: "expo.out" },
          "-=0.6"
        )
        .from(
          ".nl-form",
          { y: 20, opacity: 0, duration: 1, ease: "expo.out" },
          "-=0.6"
        );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[var(--ink)] px-6 py-32 md:px-12 md:py-48"
      ref={sectionRef}
    >
      {/* Large decorative background letter */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-8 select-none font-bold font-display text-[30vw] text-[var(--ink-muted)]/5 leading-none"
      >
        M
      </span>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <p className="nl-eyebrow mb-8 flex items-center justify-center gap-3 text-[var(--accent)] text-eyebrow">
          <span className="block h-px w-6 bg-[var(--accent)]" />
          The Inner Circle
          <span className="block h-px w-6 bg-[var(--accent)]" />
        </p>

        {/* Headline — line-by-line reveal */}
        <h2 className="nl-headline mb-8 font-display text-[var(--canvas)] text-display-lg">
          <div className="overflow-hidden">
            <span className="inline-block">Early access,</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block text-[var(--accent)] italic">
              curated drops.
            </span>
          </div>
        </h2>

        <p className="nl-body mx-auto mb-12 max-w-md text-[var(--ink-muted)] leading-relaxed">
          Join a small group of people who receive early access to new arrivals,
          invitations to private sales, and occasional notes from our makers.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="nl-form text-center">
            <p className="font-display text-2xl text-[var(--accent)] italic">
              Thank you for joining.
            </p>
            <p className="mt-3 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
              Expect your first note soon.
            </p>
          </div>
        ) : (
          <form
            className="nl-form mx-auto flex max-w-md flex-col gap-0 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <input
              className="flex-1 border border-[var(--border-color)] bg-transparent px-5 py-4 text-[var(--canvas)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              type="email"
              value={email}
            />
            <button
              className="group flex items-center justify-center gap-2 whitespace-nowrap bg-[var(--accent)] px-6 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-300 hover:bg-[var(--accent-warm)]"
              type="submit"
            >
              Subscribe
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={14}
              />
            </button>
          </form>
        )}

        <p className="mt-5 text-[0.65rem] text-[var(--ink-muted)]">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
