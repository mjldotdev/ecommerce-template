"use client";

import { useScrollProgress } from "@/hooks/use-media-query";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] h-[2px] bg-[var(--border-color)]"
    >
      <div
        className="h-full origin-left bg-[var(--accent)] transition-transform duration-75"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
