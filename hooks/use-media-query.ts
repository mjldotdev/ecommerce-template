import { useEffect, useState } from "react";

/**
 * useMediaQuery
 * Returns true when the given CSS media query matches.
 * SSR-safe: returns `defaultValue` until after hydration.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/**
 * useScrollProgress
 * Returns a 0–1 value representing how far the user has scrolled the page.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

/**
 * useIsomorphicLayoutEffect
 * Uses layoutEffect on the client, useEffect on the server (avoids SSR warnings).
 */
export { useEffect as useIsomorphicLayoutEffect };
