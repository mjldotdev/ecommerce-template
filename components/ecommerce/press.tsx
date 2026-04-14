"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const press = [
  {
    outlet: "Wallpaper*",
    quote: "The standard for considered objects in a noisy market.",
  },
  {
    outlet: "Monocle",
    quote: "They have a rare ability to make restraint feel generous.",
  },
  {
    outlet: "Financial Times",
    quote: "Objects that justify the word 'investment' without irony.",
  },
  {
    outlet: "Apartamento",
    quote: "The kind of shop you visit to be reminded what things can be.",
  },
];

export default function Press() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".press-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });

      gsap.from(".press-logos span", {
        scrollTrigger: {
          trigger: ".press-logos",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="bg-[var(--surface)] px-6 py-24 md:px-12 md:py-36"
      ref={sectionRef}
    >
      {/* Section label */}
      <div className="mb-16 flex items-center gap-4">
        <span className="block h-px w-6 bg-[var(--accent)]" />
        <span className="text-[var(--ink-muted)] text-eyebrow">As seen in</span>
      </div>

      {/* Press quotes grid */}
      <div className="grid grid-cols-1 gap-px bg-[var(--border-color)] md:grid-cols-2 lg:grid-cols-4">
        {press.map((item) => (
          <div
            className="press-item flex flex-col justify-between gap-10 bg-[var(--surface)] p-8 md:p-10"
            key={item.outlet}
          >
            <p className="font-display text-[var(--ink)] text-xl italic leading-snug">
              "{item.quote}"
            </p>
            <p className="text-[0.6rem] text-[var(--accent)] text-eyebrow">
              — {item.outlet}
            </p>
          </div>
        ))}
      </div>

      {/* Logo strip */}
      <div className="press-logos mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-40">
        {press.map((item) => (
          <span
            className="font-display text-[var(--ink)] text-sm uppercase tracking-widest"
            key={`logo-${item.outlet}`}
          >
            {item.outlet}
          </span>
        ))}
      </div>
    </section>
  );
}
