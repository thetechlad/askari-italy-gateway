import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** True once per animation call-site: gates every GSAP timeline/ScrollTrigger in this app
 * behind the user's reduced-motion preference, matching the existing `.reveal` CSS fallback. */
export function prefersMotion() {
  return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
