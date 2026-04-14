"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!(dot && ring)) {
      return;
    }

    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power3.out",
      });

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.55,
        ease: "power3.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 2.2,
        opacity: 0.5,
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const linkEls = document.querySelectorAll("a, button");
    linkEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      linkEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] md:block"
        ref={dotRef}
      />
      {/* Ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--ink)] md:block"
        ref={ringRef}
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
