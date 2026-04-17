"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollProgressBar
 *
 * Uses a direct DOM ref + scroll listener instead of React state, so there
 * are zero re-renders and no GPU compositing artifacts from scaleX on mobile.
 * Width is driven by a CSS custom property set inline — the browser paints a
 * simple width change, which avoids the "ghost trail" that scaleX can leave
 * on iOS Safari and some Android Chrome builds.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      // Drive width directly — no React state, no re-render, no scaleX
      bar.style.width = `${Math.min(progress * 100, 100)}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update(); // set initial value
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] h-[2px] overflow-hidden"
      role="presentation"
    >
      <div
        className="h-full bg-[var(--accent)]"
        ref={barRef}
        style={{ width: "0%" }}
      />
    </div>
  );
}
