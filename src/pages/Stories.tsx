import { useTestimonials } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";

const AVATAR_COLORS = ["bg-askari-gold", "bg-askari-coral", "bg-askari-sky"];

export default function Stories() {
  usePageMeta(
    "Success Stories",
    "Real outcomes from Pakistani students Askari Consultants has placed in Italian universities, from Milan to Rome to Bologna.",
    { path: "/stories" }
  );
  const { data: testimonials } = useTestimonials();

  return (
    <div>
      <section className="bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Success stories</div>
          <h1 className="text-display-1 mt-4">
            Students who are already there.
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:px-10 md:py-20">
        <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(testimonials ?? []).map((t, i) => (
            <div
              key={t.name}
              className="lift-on-hover card-flat flex flex-col bg-askari-white p-7"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-askari-green">{t.tag}</div>
              <p className="mt-4 font-display text-[23px] leading-snug">“{t.quote}”</p>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-bold text-askari-navy ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  }`}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[12.5px] text-askari-textBody2">{t.where}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
