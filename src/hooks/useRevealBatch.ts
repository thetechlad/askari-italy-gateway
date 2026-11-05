import { RefObject, useEffect } from "react";
import { gsap, ScrollTrigger, prefersMotion } from "@/lib/gsap";

/**
 * Scroll-reveal for a grid/list of many siblings (visa approval cards, bento
 * cards, pricing cards) — uses `ScrollTrigger.batch()` so the whole grid
 * shares one scroll listener instead of creating one IntersectionObserver or
 * ScrollTrigger per card (the pattern `useReveal`/`Reveal` uses for single
 * items, which doesn't scale well to grids of 10+ elements).
 *
 * Usage: give each card the same class (default "reveal-item") and call this
 * with a ref to their shared container, after the cards have rendered.
 */
export function useRevealBatch(
  containerRef: RefObject<HTMLElement>,
  itemSelector = ".reveal-item",
  deps: unknown[] = []
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>(itemSelector);
    if (!items.length) return;

    if (!prefersMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 22 });
    const batch = ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      interval: 0.08,
      batchMax: 6,
      onEnter: (batchItems) =>
        gsap.to(batchItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          overwrite: true,
        }),
    });

    return () => {
      batch.forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelector, ...deps]);
}
