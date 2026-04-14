"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Elsa Verne",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  },
  {
    name: "Théo Marchand",
    role: "Head of Curation",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
  },
  {
    name: "Ines Sato",
    role: "Design & Visual Identity",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
  },
];

const values = [
  {
    number: "01",
    title: "Radical honesty about craft.",
    body: "We describe exactly how things are made, where, and by whom. No vague provenance. No sustainability-washing.",
  },
  {
    number: "02",
    title: "Every object must outlive its trend.",
    body: "We do not carry seasonal novelties. If we cannot imagine it growing more beautiful with age, we pass.",
  },
  {
    number: "03",
    title: "Maker relationships first.",
    body: "We pay above market rate, visit ateliers annually, and share final selling prices with every maker we work with.",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero
      gsap.from(".about-hero-line", {
        y: "110%",
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".about-hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.7,
      });

      // Values
      gsap.from(".value-item", {
        scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
      });

      // Team
      gsap.from(".team-card", {
        scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });

      // Parallax on hero image
      gsap.to(".about-hero-img", {
        scrollTrigger: {
          trigger: ".about-hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        ease: "none",
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <Navbar />

      <main className="pt-24">
        {/* Hero — full viewport */}
        <section className="about-hero-section relative flex h-[85vh] items-end overflow-hidden px-6 pb-16 md:px-12">
          <Image
            alt="Atelier interior"
            className="about-hero-img -z-10 object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--ink)]/75 to-transparent" />

          <div>
            <p className="mb-8 flex items-center gap-3 text-[var(--canvas)]/60 text-eyebrow">
              <span className="block h-px w-6 bg-[var(--accent)]" />
              Our Story
            </p>
            <h1 className="font-display text-[var(--canvas)]">
              <div className="overflow-hidden">
                <span className="about-hero-line block text-display-xl">
                  Living
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="about-hero-line block text-[var(--accent)] text-display-xl italic">
                  deliberately.
                </span>
              </div>
            </h1>
            <p className="about-hero-sub mt-6 max-w-md text-[var(--canvas)]/70 leading-relaxed">
              M.dev was founded in 2019 with one conviction: the objects we
              surround ourselves with shape how we move through the world.
            </p>
          </div>
        </section>

        {/* Main text */}
        <section className="grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2 md:gap-24 md:px-12 md:py-36">
          <div>
            <p className="mb-8 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
              <span className="block h-px w-6 bg-[var(--accent)]" />
              The Beginning
            </p>
            <p className="font-display text-2xl text-[var(--ink)] leading-snug">
              We started by asking a simple question: where do the people who
              truly care about craft actually shop?
            </p>
          </div>
          <div className="flex flex-col gap-5 text-[var(--ink-muted)] text-sm leading-relaxed">
            <p>
              The answer, we found, was scattered — a ceramicist in Portugal
              discovered through a friend, a jacket-maker in Kyoto found after
              years of searching. Beautiful things existed, but finding them
              required a level of knowledge most people simply did not have time
              to build.
            </p>
            <p>
              M.dev is our attempt to change that. We travel to meet the makers,
              we learn the materials, we refuse things that do not meet our
              standards — and then we make them available to anyone who has ever
              cared enough to ask.
            </p>
            <p>
              We are a small team, intentionally. We prefer depth to breadth,
              relationships to transactions, and objects that will still be in
              your life in twenty years.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-[var(--border-color)] border-y bg-[var(--surface)] px-6 py-24 md:px-12 md:py-28">
          <p className="mb-16 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            What We Believe
          </p>
          <div className="values-grid grid grid-cols-1 gap-px bg-[var(--border-color)] md:grid-cols-3">
            {values.map((v) => (
              <div
                className="value-item flex flex-col gap-6 bg-[var(--surface)] p-10 md:p-12"
                key={v.number}
              >
                <span className="font-display text-[var(--accent)] text-sm">
                  {v.number}
                </span>
                <h3 className="font-display text-2xl text-[var(--ink)] leading-snug">
                  {v.title}
                </h3>
                <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="px-6 py-24 md:px-12 md:py-36">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
                <span className="block h-px w-6 bg-[var(--accent)]" />
                The People
              </p>
              <h2 className="font-display text-[var(--ink)] text-display-md">
                A small team.
                <br />
                <em className="text-[var(--accent)]">A clear point of view.</em>
              </h2>
            </div>
          </div>

          <div className="team-grid grid grid-cols-1 gap-8 sm:grid-cols-3">
            {team.map((member, i) => (
              <div
                className={`team-card ${i === 1 ? "sm:mt-16" : ""}`}
                key={member.name}
              >
                <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-[var(--surface)]">
                  <Image
                    alt={member.name}
                    className="object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    src={member.image}
                  />
                </div>
                <p className="font-display text-[var(--ink)] text-lg">
                  {member.name}
                </p>
                <p className="mt-1 text-[0.6rem] text-[var(--ink-muted)] text-eyebrow">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
