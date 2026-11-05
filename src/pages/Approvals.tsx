import { useVisaApprovals } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { VisaApprovalsWall } from "@/components/VisaApprovalsWall";
import { TrustStrip } from "@/components/TrustStrip";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionGlow } from "@/components/SectionGlow";

export default function Approvals() {
  usePageMeta(
    "Visa Approvals",
    "Every 2026 Italy student visa filed by Askari Consultants — names, universities and dates, published as they happen.",
    { path: "/approvals" }
  );
  const { data: approvals, isLoading } = useVisaApprovals();

  return (
    <div>
      <section className="dotted-bg relative isolate overflow-hidden bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <SectionGlow corner="tr" color="gold" size={560} opacity={0.16} />
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="inline-flex items-center rounded-full bg-askari-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-askari-navy">
            Visa Approvals &middot; 2026
          </div>
          <h1 className="text-display-1 mt-5 max-w-[760px]">
            Every visa we got this year, published
          </h1>
          <p className="mt-5 max-w-[560px] text-base leading-relaxed text-askari-cream/70">
            Names, universities, marks and dates as they appear on each approval.
          </p>
          <div className="mt-4 font-display text-lg italic text-askari-gold" style={{ fontStyle: "italic" }}>
            Your Journey, Our Priority
          </div>
        </Reveal>
      </section>

      <section className="dotted-bg relative bg-askari-sand px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-display-3 sm:text-[36px]">Real students. Real visas. This year.</h2>
              <div className="mt-2 h-[3px] w-20 bg-askari-gold" />
              <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-askari-textBody">
                Every card is a 2026 Italy student visa filed by our team.
              </p>
            </div>
          </div>
          {isLoading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="card-flat overflow-hidden bg-askari-white">
                  <Skeleton className="h-[170px] w-full rounded-none" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {approvals && (
            <>
              <TrustStrip visaCount={approvals.length} />
              <VisaApprovalsWall approvals={approvals} />
            </>
          )}
        </Reveal>
      </section>
    </div>
  );
}
