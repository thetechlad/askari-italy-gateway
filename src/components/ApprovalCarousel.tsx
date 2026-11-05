import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VisaApproval, mediaUrl } from "@/lib/strapi";

export function ApprovalCarousel({ approvals }: { approvals: VisaApproval[] }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  if (approvals.length === 0) return null;
  const current = approvals[index % approvals.length];

  const prev = () => setIndex((i) => (i - 1 + approvals.length) % approvals.length);
  const next = () => setIndex((i) => (i + 1) % approvals.length);

  const image = current.photo ? (
    <img src={mediaUrl(current.photo.url)} alt={current.studentName} className="h-full w-full object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-display text-7xl text-askari-navy/70">
        {current.studentName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </span>
    </div>
  );

  return (
    <div className="relative w-full max-w-[320px] pb-4 pr-4">
      <div className="relative">
        {/* Offset gold card peeking out behind the photo, matching the reference's layered look */}
        <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl bg-askari-gold" />
        <button
          onClick={() => setZoomed(true)}
          className="relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          aria-label={`View full poster for ${current.studentName}`}
        >
          <div className="aspect-[4/5] w-full">{image}</div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-askari-navy/90 to-transparent p-5 pt-14">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-askari-gold">Visa approved</div>
            <div className="mt-1 text-lg font-bold leading-snug text-white">{current.studentName}</div>
            {current.university && <div className="text-[13px] text-white/75">{current.university}</div>}
          </div>
        </button>
        <button
          onClick={prev}
          aria-label="Previous approval"
          className="absolute -left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-askari-navy shadow-md transition-transform hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next approval"
          className="absolute -right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-askari-navy shadow-md transition-transform hover:scale-105"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-askari-navy/90 p-6"
          onClick={() => setZoomed(false)}
        >
          <div className="max-h-[90vh] w-full max-w-[480px] overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            {image}
          </div>
          <button
            onClick={() => setZoomed(false)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
