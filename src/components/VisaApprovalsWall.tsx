import { useRef } from "react";
import { VisaApproval, mediaUrl } from "@/lib/strapi";
import { useRevealBatch } from "@/hooks/useRevealBatch";

const CARD_TINTS = ["bg-askari-navySlate", "bg-askari-navyLight", "bg-askari-navyDark"];

function formatVisaDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function VisaApprovalsWall({ approvals, limit }: { approvals: VisaApproval[]; limit?: number }) {
  const items = limit ? approvals.slice(0, limit) : approvals;
  const gridRef = useRef<HTMLDivElement>(null);
  useRevealBatch(gridRef, ".reveal-item", [items.length]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((a, i) => (
        <div
          key={`${a.studentName}-${i}`}
          className="reveal-item lift-on-hover overflow-hidden rounded-2xl border border-askari-navy/10 bg-askari-white"
        >
          <div className={`flex h-[170px] w-full items-center justify-center ${CARD_TINTS[i % CARD_TINTS.length]}`}>
            {a.photo ? (
              <img src={mediaUrl(a.photo.url)} alt={a.studentName} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-4xl text-askari-cream/70">{initials(a.studentName)}</span>
            )}
          </div>
          <div className="p-4">
            <div className="text-[15px] font-bold leading-snug">{a.studentName}</div>
            {a.university && (
              <div className="mt-0.5 text-[12.5px] font-semibold text-askari-goldDark">{a.university}</div>
            )}
            {formatVisaDate(a.visaDate) && (
              <div className="mt-1.5 text-[11.5px] text-askari-textBody2">Visa {formatVisaDate(a.visaDate)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
