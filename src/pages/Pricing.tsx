import { usePricingPackages, useAlaCarteItems } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { WHATSAPP_ITALY } from "@/lib/contact";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";

export default function Pricing() {
  usePageMeta(
    "Pricing",
    "Three published packages for Italy university admissions and visa support, plus à la carte services — fees in Pakistani rupees, no hidden charges.",
    { path: "/pricing" }
  );
  const { data: packages } = usePricingPackages();
  const { data: alacarte } = useAlaCarteItems();

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <SectionGlow corner="tr" color="gold" size={560} opacity={0.16} />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Pricing</div>
          <h1 className="text-display-1 mt-4">
            Three packages. Published prices.
          </h1>
          <p className="mt-5 max-w-[560px] text-base leading-relaxed text-askari-cream/70">
            Fees are in Pakistani rupees and cover our work only. University, embassy and translation
            charges are paid directly by you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:px-10 md:py-20">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(packages ?? []).map((p) => {
            const isDark = p.tier === "Premium";
            return (
              <div
                key={p.name}
                className={`lift-on-hover relative flex flex-col rounded-[24px] border border-askari-navy/10 p-8 ${p.badge ? "shadow-[0_18px_40px_-20px_rgba(11,23,54,0.18)]" : ""} ${
                  isDark ? "bg-askari-navy text-askari-cream" : "bg-askari-white text-askari-navy"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 right-7 rounded-full bg-askari-coral px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-askari-cream shadow-[0_6px_16px_-4px_rgba(226,87,43,0.6)]">
                    {p.badge}
                  </span>
                )}
                <div className="text-[11px] uppercase tracking-[0.2em] opacity-60">{p.tier}</div>
                <div className="mt-3.5 font-display text-[34px] leading-tight">{p.name}</div>
                <div className={`mt-3 text-[30px] font-semibold ${isDark ? "text-askari-gold" : "text-askari-goldMuted"}`}>
                  {p.price}
                </div>
                <p className="mb-5 mt-3 text-[13.5px] leading-relaxed opacity-70">{p.who}</p>
                {p.items.map((item) => (
                  <div key={item} className="flex gap-2.5 py-2 text-sm leading-snug">
                    <span className="text-askari-gold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
                <a
                  href={`https://wa.me/${WHATSAPP_ITALY}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6.5 justify-center ${isDark ? "btn-primary" : "btn-secondary"}`}
                >
                  Select {p.name}
                </a>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(alacarte ?? []).map((a) => (
            <div key={a.name} className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-cream p-5.5">
              <div className="text-[15px] font-semibold">{a.name}</div>
              <div className="mt-1.5 font-display text-xl text-askari-goldMuted">{a.price}</div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-[13.5px] text-askari-textBody2">
          Bespoke packages are available for families and PR seekers. Prices last reviewed September 2026.
        </p>
      </section>
    </div>
  );
}
