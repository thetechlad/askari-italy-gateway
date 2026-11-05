import { RefObject, useEffect } from "react";
import { gsap, prefersMotion } from "@/lib/gsap";

/**
 * Subtle magnetic pull toward the cursor for primary CTA buttons on
 * pointer devices — skipped on touch (no hover) and under reduced-motion.
 */
export function useMagneticButton(ref: RefObject<HTMLElement>, maxOffset = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !prefersMotion() || "ontouchstart" in window) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(gsap.utils.clamp(-maxOffset, maxOffset, relX * 0.25));
      yTo(gsap.utils.clamp(-maxOffset, maxOffset, relY * 0.25));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, maxOffset]);
}
