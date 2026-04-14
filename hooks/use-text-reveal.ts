"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { type RefObject, useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealOptions {
  /** Delay before animation starts. Default: 0 */
  delay?: number;
  /** Duration per word animation. Default: 1 */
  duration?: number;
  /** GSAP ease. Default: "expo.out" */
  ease?: string;
  /** Stagger between words in seconds. Default: 0.06 */
  stagger?: number;
  /** ScrollTrigger start position. Default: "top 85%" */
  start?: string;
}

/**
 * useTextReveal
 * Wraps each word in the target element in a clip container and animates
 * them up from below when scrolled into view.
 *
 * Usage:
 *   const ref = useTextReveal<HTMLHeadingElement>();
 *   return <h2 ref={ref}>Hello world, this is revealed word by word.</h2>
 */
export function useTextReveal<T extends HTMLElement = HTMLElement>(
  options: TextRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const {
    start = "top 85%",
    stagger = 0.06,
    duration = 1,
    ease = "expo.out",
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const originalHTML = el.innerHTML;
    const text = el.innerText;
    const words = text.split(" ");

    // Wrap each word in a clip container
    el.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="reveal-word" style="display:inline-block;">${word}</span></span>`
      )
      .join(" ");

    const wordEls = el.querySelectorAll<HTMLElement>(".reveal-word");

    const animation = gsap.from(wordEls, {
      y: "105%",
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === el)
        .forEach((t) => t.kill());
      el.innerHTML = originalHTML;
    };
  }, [start, stagger, duration, ease, delay]);

  return ref;
}
