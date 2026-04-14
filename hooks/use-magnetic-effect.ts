"use client";

import gsap from "gsap";
import { type RefObject, useEffect, useRef } from "react";

interface MagneticOptions {
  /** Duration of follow animation in seconds. Default: 0.6 */
  duration?: number;
  /** GSAP ease for the follow animation. Default: "power3.out" */
  ease?: string;
  /** How far (in px) the element pulls toward the cursor. Default: 0.35 */
  strength?: number;
}

/**
 * useMagneticEffect
 * Attaches a magnetic GSAP hover effect to the returned ref.
 * The element drifts toward the cursor on enter and snaps back on leave.
 *
 * Usage:
 *   const magnetRef = useMagneticEffect<HTMLButtonElement>();
 *   return <button ref={magnetRef}>Click me</button>
 */
export function useMagneticEffect<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const { strength = 0.35, ease = "power3.out", duration = 0.6 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      gsap.to(el, { x: dx, y: dy, duration, ease });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength, ease, duration]);

  return ref;
}
