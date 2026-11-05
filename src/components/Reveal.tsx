import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/** Wraps content that should fade/slide up into view as the user scrolls to it. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isRevealed } = useReveal();
  return (
    <div
      ref={ref}
      data-revealed={isRevealed}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
