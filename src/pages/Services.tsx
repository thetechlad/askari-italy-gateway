import { Link } from "react-router-dom";
import { useServices } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";

const AVATAR_COLORS = ["bg-askari-gold", "bg-askari-coral", "bg-askari-sky"];

export default function Services() {
  usePageMeta(
    "Services",
    "University admissions, visa filing, FBR/NTN assistance, SOP writing, interview coaching and translation — everything between your transcript and your residence permit.",
    { path: "/services" }
  );
  const { data: services } = useServices();

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <SectionGlow corner="tr" color="gold" size={560} opacity={0.16} />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Services</div>
          <h1 className="text-display-1 mt-4 max-w-[900px]">
            Everything between your transcript and your residence permit.
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:px-10 md:py-20">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(services ?? []).map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="lift-on-hover flex flex-col rounded-2xl border border-askari-navy/10 bg-askari-white p-6"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-base text-askari-navy ${
                  AVATAR_COLORS[i % AVATAR_COLORS.length]
                }`}
              >
                {s.num}
              </div>
              <div className="mt-5 font-display text-2xl leading-snug">{s.name}</div>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-askari-textBody">{s.long}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-askari-goldMuted">
                Learn more <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
