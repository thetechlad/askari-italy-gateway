import { useEffect, useState } from "react";

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates an integer from 0 up to the number embedded in `value` (e.g. "100+",
 * "95%", "24h") once `start` flips true, and returns the string with the same
 * prefix/suffix reattached. Non-numeric values pass through unchanged.
 */
export function useCountUp(value: string, start: boolean, durationMs = 1100) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!start || !match) {
      if (!match) setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const current = target * EASE_OUT(progress);
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, value]);

  return display;
}
