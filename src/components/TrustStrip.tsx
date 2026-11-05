import { useCountUp } from "@/hooks/useCountUp";

function TrustStat({ n, l }: { n: string; l: string }) {
  const display = useCountUp(n, true, 900);
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-display text-base tabular-nums text-askari-navy">{display}</span>
      <span className="text-[12.5px] text-askari-textBody2">{l}</span>
    </span>
  );
}

/** Compact real-data stat row — same numbers already shown in the hero, reused here
 * so the Visa Approvals Wall carries a trust signal instead of just photos. */
export function TrustStrip({ visaCount }: { visaCount: number }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-askari-navy/10 pt-5">
      <TrustStat n={String(visaCount)} l="visas this season" />
      <TrustStat n="42 days" l="average, file to visa" />
      <TrustStat n="24h" l="reply time" />
    </div>
  );
}
