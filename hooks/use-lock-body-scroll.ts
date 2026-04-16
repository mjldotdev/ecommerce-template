import { useEffect } from "react";

/**
 * useLockBodyScroll
 * Prevents the body from scrolling while `active` is true.
 * Automatically restores scroll on cleanup.
 */
export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) {
      return;
    }
    const original = document.body.style.overflow;
    const originalPr = document.body.style.paddingRight;
    // Compensate for scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingRight = originalPr;
    };
  }, [active]);
}
