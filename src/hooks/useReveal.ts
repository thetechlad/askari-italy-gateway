import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Returns a ref to attach to an element and a boolean that flips to true
 * once the element scrolls into view — pair with the `.reveal` CSS class
 * (`data-revealed={isRevealed}`) for a fade-up-on-scroll effect.
 *
 * Driven by GSAP's ScrollTrigger (not IntersectionObserver) so it shares one
 * scroll listener and refresh cycle with every other ScrollTrigger on the
 * page, and respects `ScrollTrigger.refresh()` calls on route change.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // threshold 0.15 -> fire when ~15% of the element has entered the viewport.
    const startPct = Math.round((1 - threshold) * 100);
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => setIsRevealed(true),
    });
    return () => trigger.kill();
  }, [threshold]);

  return { ref, isRevealed };
}
