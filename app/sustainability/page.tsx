"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    name: "Full-Grain Leather",
    origin: "Tuscany, Italy",
    standard: "LWG Gold Certified",
    notes: "Vegetable-tanned, no heavy metals. Tanneries audited annually.",
    color: "#C4A882",
  },
  {
    name: "Belgian Linen",
    origin: "Courtrai, Belgium",
    standard: "OEKO-TEX 100",
    notes:
      "Grown without irrigation. Zero synthetic fertilizers. Carbon-negative fibre.",
    color: "#D4C4A8",
  },
  {
    name: "Merino Wool",
    origin: "South Island, New Zealand",
    standard: "ZQ Merino Certified",
    notes: "Mulesing-free, traceable to station level. Annual welfare audits.",
    color: "#B8A89A",
  },
  {
    name: "Stoneware",
    origin: "Porto, Portugal",
    standard: "Studio-made",
    notes:
      "Fired in wood kilns. Lead-free glazes. Waste clay reclaimed and recycled.",
    color: "#A89880",
  },
  {
    name: "Solid Brass",
    origin: "Kyoto, Japan",
    standard: "Recycled content >60%",
    notes:
      "All offcuts returned to foundry. No electroplating — patina develops naturally.",
    color: "#C8A850",
  },
];

const commitments = [
  {
    number: "01",
    title: "No greenwashing.",
    body: "We do not use words like 'eco-friendly', 'green', or 'sustainable' as marketing claims. We describe facts: where things are made, by whom, under what standards.",
  },
  {
    number: "02",
    title: "Carbon transparency.",
    body: "We calculate the estimated carbon footprint of every product we sell and publish it on the product page. We offset 300% — not 100% — of measured emissions.",
  },
  {
    number: "03",
    title: "Repair before replace.",
    body: "We offer a lifetime repair service for every product we sell. A product that can be repaired will never need to be replaced. We charge cost price for repairs.",
  },
  {
    number: "04",
    title: "Maker wages published.",
    body: "We publish the hourly wage of every maker we work with, alongside the retail price. We believe transparency on this question is non-negotiable.",
  },
];

export default function SustainabilityPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".sust-hero > *", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".commitment-item", {
        scrollTrigger: { trigger: ".commitments-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });

      gsap.from(".material-row", {
        scrollTrigger: { trigger: ".materials-table", start: "top 80%" },
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        {/* Hero */}
        <div className="sust-hero border-[var(--border-color)] border-b px-6 pt-8 pb-16 md:px-12">
          <span className="mb-5 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            How We Make Things
          </span>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <h1 className="font-display text-[var(--ink)] text-display-lg">
              Sustainability
            </h1>
            <p className="max-w-md self-end text-[var(--ink-muted)] text-sm leading-relaxed md:pb-2">
              This page exists because we believe you deserve to know exactly
              what you are buying, where it comes from, and what it cost — in
              every sense of that word — to make.
            </p>
          </div>
        </div>

        {/* Full bleed editorial image with text overlay */}
        <div className="relative mx-6 my-16 h-[50vh] overflow-hidden md:mx-12">
          <Image
            alt="Hands crafting leather"
            className="object-cover object-center"
            fill
            sizes="100vw"
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90"
          />
          <div className="absolute inset-0 bg-[var(--ink)]/50" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="max-w-2xl text-center font-display text-3xl text-[var(--canvas)] italic leading-tight md:text-5xl">
              "The most sustainable object is the one that never needs to be
              replaced."
            </p>
          </div>
        </div>

        {/* Commitments */}
        <div className="px-6 py-16 md:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            <span className="text-[var(--ink-muted)] text-eyebrow">
              Our Commitments
            </span>
          </div>
          <div className="commitments-grid grid grid-cols-1 gap-px bg-[var(--border-color)] md:grid-cols-2">
            {commitments.map((c) => (
              <div
                className="commitment-item flex flex-col gap-5 bg-[var(--canvas)] p-10"
                key={c.number}
              >
                <span className="font-display text-[var(--accent)] text-sm">
                  {c.number}
                </span>
                <h3 className="font-display text-2xl text-[var(--ink)]">
                  {c.title}
                </h3>
                <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Materials transparency table */}
        <div className="border-[var(--border-color)] border-y bg-[var(--surface)] px-6 py-16 md:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            <span className="text-[var(--ink-muted)] text-eyebrow">
              Materials Transparency
            </span>
          </div>

          <div className="materials-table flex flex-col divide-y divide-[var(--border-color)]">
            {/* Table header */}
            <div className="hidden grid-cols-5 gap-6 pb-4 md:grid">
              {["Material", "Origin", "Standard", "Notes", ""].map((h) => (
                <p
                  className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow"
                  key={h}
                >
                  {h}
                </p>
              ))}
            </div>

            {materials.map((mat) => (
              <div
                className="material-row grid grid-cols-1 items-start gap-3 py-6 md:grid-cols-5 md:gap-6"
                key={mat.name}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: mat.color }}
                  />
                  <p className="font-display text-[var(--ink)] text-base">
                    {mat.name}
                  </p>
                </div>
                <p className="text-[var(--ink-muted)] text-sm">{mat.origin}</p>
                <p className="text-[0.6rem] text-[var(--accent)] text-eyebrow">
                  {mat.standard}
                </p>
                <p className="text-[var(--ink-muted)] text-sm leading-relaxed md:col-span-2">
                  {mat.notes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon section */}
        <div className="px-6 py-16 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="block h-px w-6 bg-[var(--accent)]" />
                <span className="text-[var(--ink-muted)] text-eyebrow">
                  Carbon
                </span>
              </div>
              <h2 className="mb-6 font-display text-[var(--ink)] text-display-md">
                300% offset.
                <br />
                <em className="text-[var(--accent)]">Not 100%.</em>
              </h2>
              <p className="mb-5 text-[var(--ink-muted)] text-sm leading-relaxed">
                We measure the full lifecycle carbon footprint of every product:
                raw material extraction, production, transport, packaging, and
                estimated end-of-life. We then offset three times that amount
                through verified reforestation projects in Portugal and coastal
                restoration in Scotland.
              </p>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                We publish our full carbon methodology on request. Email{" "}
                <a
                  className="link-underline text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                  href="mailto:impact@mdev.co"
                >
                  impact@mdev.co
                </a>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "300%", label: "Carbon offset ratio" },
                { value: "12", label: "Verified maker partners" },
                { value: "0", label: "Products with synthetics" },
                { value: "∞", label: "Repair service (lifetime)" },
              ].map((stat) => (
                <div
                  className="flex flex-col justify-between gap-6 border border-[var(--border-color)] p-8"
                  key={stat.label}
                >
                  <p className="font-display text-4xl text-[var(--ink)]">
                    {stat.value}
                  </p>
                  <p className="text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
