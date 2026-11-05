import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersMotion } from "@/lib/gsap";

/** Ref to attach to a thin bar element — fills left-to-right as the page scrolls. */
export function useScrollProgressBar<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!prefersMotion()) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(document.body.scrollHeight - window.innerHeight, 1),
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });
    return () => trigger.kill();
  }, []);

  return ref;
}

/** True once the page has scrolled past `threshold`px — drives the header's shrink-on-scroll state. */
export function useScrolledPast(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: threshold,
      end: 999999,
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => trigger.kill();
  }, [threshold]);

  return scrolled;
}
