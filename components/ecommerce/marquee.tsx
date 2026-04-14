"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: `-${totalWidth}px`,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-[var(--border-color)] border-y bg-[var(--ink)] py-5"
    >
      <div className="flex items-center whitespace-nowrap" ref={trackRef}>
        {doubled.map((item, i) => (
          <div className="flex flex-shrink-0 items-center" key={`${item}-${i}`}>
            <span className="px-6 font-display text-[var(--canvas)] text-xl italic">
              {item}
            </span>
            <span className="flex-shrink-0 text-[var(--accent)] text-sm">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
