"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";

const topics = [
  "Order Enquiry",
  "Press & Collaborations",
  "Wholesale",
  "Maker Submissions",
  "General",
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTopic, setActiveTopic] = useState("General");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".contact-header > *", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      }).from(
        ".contact-grid > *",
        { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, ease: "expo.out" },
        "-=0.8"
      );
    },
    { scope: pageRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={pageRef}>
      <Navbar />
      <main className="min-h-screen px-6 pt-28 pb-24 md:px-12">
        {/* Header */}
        <div className="contact-header border-[var(--border-color)] border-b pt-8 pb-16">
          <span className="mb-4 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            Get in Touch
          </span>
          <h1 className="font-display text-[var(--ink)] text-display-lg">
            Contact
          </h1>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid grid grid-cols-1 gap-16 pt-16 lg:grid-cols-5 lg:gap-24">
          {/* Left — info */}
          <div className="flex flex-col gap-12 lg:col-span-2">
            <div>
              <p className="mb-4 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                Studio Hours
              </p>
              <div className="flex flex-col gap-2 text-[var(--ink-muted)] text-sm">
                <div className="flex justify-between border-[var(--border-color)] border-b pb-2">
                  <span>Mon — Fri</span>
                  <span>9:00 — 18:00 CET</span>
                </div>
                <div className="flex justify-between border-[var(--border-color)] border-b pb-2">
                  <span>Saturday</span>
                  <span>By appointment</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Sunday</span>
                  <span className="text-[var(--ink-muted)]/50">Closed</span>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                Direct Contact
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "General", value: "hello@mdev.co" },
                  { label: "Press", value: "press@mdev.co" },
                  { label: "Wholesale", value: "trade@mdev.co" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="mb-0.5 text-[0.55rem] text-[var(--ink-muted)] text-eyebrow">
                      {item.label}
                    </p>
                    <a
                      className="link-underline text-[var(--ink)] text-sm transition-colors duration-300 hover:text-[var(--accent)]"
                      href={`mailto:${item.value}`}
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                Atelier Address
              </p>
              <address className="text-[var(--ink-muted)] text-sm not-italic leading-relaxed">
                Via dei Servi, 14
                <br />
                50122 Florence
                <br />
                Italy
              </address>
            </div>

            <div>
              <p className="mb-4 text-[0.6rem] text-[var(--ink)] text-eyebrow">
                Response Time
              </p>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                We aim to respond to all enquiries within one business day. For
                urgent order matters, please reference your order number in the
                subject line.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                <span className="font-display text-4xl text-[var(--accent)]">
                  ◆
                </span>
                <h2 className="font-display text-3xl text-[var(--ink)] italic">
                  Message received.
                </h2>
                <p className="max-w-xs text-[var(--ink-muted)] text-sm leading-relaxed">
                  We will be in touch within one business day. Thank you for
                  reaching out.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                {/* Topic selector */}
                <div>
                  <label className="mb-3 block text-[0.6rem] text-[var(--ink)] text-eyebrow">
                    What can we help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        className={`border px-4 py-2 text-[0.6rem] text-eyebrow transition-all duration-300 ${
                          activeTopic === topic
                            ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]"
                            : "border-[var(--border-color)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                        }`}
                        key={topic}
                        onClick={() => setActiveTopic(topic)}
                        type="button"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="name"
                      placeholder="Your full name"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                      id="email"
                      placeholder="your@email.com"
                      required
                      type="email"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                    id="subject"
                    placeholder={`Re: ${activeTopic}`}
                    type="text"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[0.6rem] text-[var(--ink)] text-eyebrow"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="resize-none border border-[var(--border-color)] bg-transparent px-4 py-3 text-[var(--ink)] text-sm transition-colors duration-300 placeholder:text-[var(--ink-muted)] focus:border-[var(--ink)] focus:outline-none"
                    id="message"
                    placeholder="Write your message here..."
                    required
                    rows={6}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between">
                  <p className="text-[var(--ink-muted)] text-xs">
                    We respond within 1 business day.
                  </p>
                  <button
                    className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--canvas)] text-eyebrow transition-colors duration-500 hover:bg-[var(--accent)]"
                    type="submit"
                  >
                    Send Message
                    <ArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      size={13}
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
