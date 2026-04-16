import { type RefObject, useEffect, useRef, useState } from "react";

interface InViewOptions {
  /** If true, once visible it stays true and stops observing. Default: true */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * useInView
 * Returns a ref to attach to an element plus a boolean indicating
 * whether the element is currently in the viewport.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: InViewOptions = {}
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
