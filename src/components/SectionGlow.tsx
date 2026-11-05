const CORNER_STYLES: Record<string, string> = {
  tl: "-left-[18%] -top-[45%] sm:-top-[35%]",
  tr: "-right-[18%] -top-[45%] sm:-top-[35%]",
  bl: "-left-[18%] -bottom-[45%] sm:-bottom-[35%]",
  br: "-right-[18%] -bottom-[45%] sm:-bottom-[35%]",
};

const COLOR_STYLES: Record<string, string> = {
  gold: "bg-askari-gold",
  navy: "bg-askari-navy",
  white: "bg-white",
};

/**
 * Soft corner glow blob reused across section backgrounds, matching the
 * reference design's ambient radial-gradient treatment (every major section
 * there layers one of these behind its content — our build never had it).
 * Purely decorative: absolutely positioned, non-interactive, behind content.
 */
export function SectionGlow({
  corner,
  color = "gold",
  size = 600,
  opacity = 0.16,
}: {
  corner: "tl" | "tr" | "bl" | "br";
  color?: "gold" | "navy" | "white";
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-[90px] ${CORNER_STYLES[corner]} ${COLOR_STYLES[color]}`}
      style={{ width: size, height: size, opacity }}
    />
  );
}
