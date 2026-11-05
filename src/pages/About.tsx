import romeDuskImg from "@/assets/design/rome-dusk.jpg";
import { useSiteSetting } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";

const ACCENTS = ["border-askari-gold/45", "border-askari-coral/50", "border-askari-sky/50"];

export default function About() {
  usePageMeta(
    "About",
    "Askari Consultants is an Italy-only admissions and visa consultancy built by people who made the move themselves — offices in Karachi, Lahore and Islamabad, with an advisor on the ground in Italy.",
    { path: "/about" }
  );
  const { data: siteSetting } = useSiteSetting();
  const facts = siteSetting?.aboutFacts ?? [];
  const principles = siteSetting?.principles ?? [];
  const byTheNumbers = siteSetting?.aboutByTheNumbers ?? [];

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-16 pt-[130px] sm:px-6 md:px-10 md:pb-28 md:pt-[210px]">
        <img src={romeDuskImg} alt="Rome at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-askari-navy/95 to-askari-navy/60" />
        <div className="relative mx-auto max-w-[1280px] text-askari-cream">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">About</div>
          <h1 className="text-display-1 mt-4 max-w-[900px]">
            A consultancy built by people who made the move themselves.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:px-10 md:py-24">
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="mb-6 font-display text-[22px] leading-relaxed sm:text-[28px]">
              Askari Consultants started because too many good applications were failing on paperwork,
              not merit.
            </p>
            <p className="mb-4.5 text-base leading-loose text-askari-textBody3">
              We work with Pakistani students applying to public and private universities in Italy.
              Offices in Karachi, Lahore and Islamabad, with an advisor based in Italy who handles the
              on-ground side: codice fiscale, permesso di soggiorno appointments, and the questions
              nobody answers until you land.
            </p>
            <p className="text-base leading-loose text-askari-textBody3">
              Every file is handled by one advisor from first call to visa decision. We keep the
              client list small on purpose.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div
                key={f.label}
                className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-cream p-5"
              >
                <span className="block text-[11px] uppercase tracking-[0.14em] text-askari-textBody2">
                  {f.label}
                </span>
                <span className="mt-1.5 block font-display text-3xl text-askari-goldMuted">{f.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-askari-navy px-4 py-12 text-askari-cream sm:px-6 md:px-10 md:py-24">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="mb-8 text-[11px] uppercase tracking-[0.2em] text-askari-gold">How we work</div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={`border-t-2 pt-5 transition-colors ${ACCENTS[i % ACCENTS.length]}`}
              >
                <div className="font-display text-2xl leading-tight">{p.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-askari-cream/60">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="dotted-bg relative bg-askari-sand px-4 py-12 sm:px-6 md:px-10 md:py-20">
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="mb-8 text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">
            Our resource library, by the numbers
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {byTheNumbers.map((f) => (
              <div
                key={f.label}
                className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-white p-6 text-center"
              >
                <div className="font-display text-4xl text-askari-goldMuted">{f.value}</div>
                <div className="mt-2 text-xs leading-snug text-askari-textBody2">{f.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
