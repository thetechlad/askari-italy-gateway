import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import lectureHallImg from "@/assets/design/lecture-hall.jpg";
import milanCloisterImg from "@/assets/design/milan-cloister.jpg";
import campusLawnImg from "@/assets/design/campus-lawn.jpg";
import romeDuskImg from "@/assets/design/rome-dusk.jpg";
import whatsappIcon from "@/assets/design/icon-whatsapp.webp";
import { WHATSAPP_ITALY, WHATSAPP_PAKISTAN } from "@/lib/contact";
import type { PricingPackage } from "@/lib/strapi";
import {
  useServices,
  usePricingPackages,
  useTestimonials,
  useFaqs,
  useSiteSetting,
  useSubmitLead,
  useVisaApprovals,
  useBlogPosts,
} from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useLeadSource } from "@/hooks/useLeadSource";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "@/components/Reveal";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { EligibilityQuiz } from "@/components/EligibilityQuiz";
import { ApprovalCarousel } from "@/components/ApprovalCarousel";
import { VisaApprovalsWall } from "@/components/VisaApprovalsWall";
import { TrustStrip } from "@/components/TrustStrip";
import { SectionGlow } from "@/components/SectionGlow";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function PackageTabs({ packages }: { packages: PricingPackage[] }) {
  const [active, setActive] = useState(0);
  const pkg = packages[active];
  if (!pkg) return null;
  const isDark = pkg.tier === "Premium";
  const mid = Math.ceil(pkg.items.length / 2);
  const col1 = pkg.items.slice(0, mid);
  const col2 = pkg.items.slice(mid);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {packages.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              i === active
                ? "bg-askari-navy text-askari-cream"
                : "bg-askari-sand text-askari-textBody hover:bg-askari-sandLight"
            }`}
          >
            {p.tier}
          </button>
        ))}
      </div>
      <div
        className={`card-raised relative mt-5 overflow-hidden rounded-[24px] p-7 sm:p-9 ${
          isDark ? "bg-askari-navy text-askari-cream" : "bg-askari-white text-askari-navy"
        }`}
      >
        {pkg.badge && (
          <span className="absolute right-7 top-7 rounded-full bg-askari-coral px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-askari-cream shadow-[0_6px_16px_-4px_rgba(226,87,43,0.6)]">
            {pkg.badge}
          </span>
        )}
        <div className="grid gap-8 sm:grid-cols-[1fr_1.3fr] sm:items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] opacity-60">{pkg.tier}</div>
            <div className="mt-3 font-display text-[30px] leading-tight">{pkg.name}</div>
            <div className={`mt-3.5 text-[30px] font-bold ${isDark ? "text-askari-gold" : "text-askari-goldDark"}`}>
              {pkg.price}
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed opacity-70">{pkg.who}</p>
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 ${isDark ? "btn-primary" : "btn-secondary"}`}
            >
              Choose {pkg.name}
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {[col1, col2].map((col, ci) => (
              <ul key={ci} className="flex flex-col gap-2.5">
                {col.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-snug opacity-85">
                    <span className={isDark ? "text-askari-gold" : "text-askari-goldDark"}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ n, l, i }: { n: string; l: string; i: number }) {
  // Hero stats are always above the fold on load — animate on mount (staggered
  // per card) rather than gating on scroll visibility, which only introduced
  // a race against the async Strapi fetch these depend on (heroStats arrives
  // after first paint, so a scroll-reveal observer set up that late could
  // miss its own already-in-view element on the very first check).
  const [start, setStart] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStart(true), i * 120);
    return () => clearTimeout(t);
  }, [i]);
  const display = useCountUp(n, start);
  return (
    <div
      className="flex items-baseline justify-between gap-3.5 rounded-2xl border border-askari-cream/15 bg-askari-cream/[0.09] px-5 py-4 backdrop-blur-sm transition-colors hover:border-askari-gold/40 hover:bg-askari-cream/[0.14]"
    >
      <span className="font-display text-[34px] leading-none text-askari-cream tabular-nums">{display}</span>
      <span className="text-right text-[11px] uppercase tracking-[0.16em] text-askari-cream/60">{l}</span>
    </div>
  );
}

const AVATAR_COLORS = ["bg-askari-gold", "bg-askari-coral", "bg-askari-sky"];

// Six services always render in this fixed bento pattern: one large photo
// card, a gold highlight, two navy cards, a white card, and a wide closing
// banner — matching the reference design rather than a uniform grid.
const BENTO_STYLES: {
  className: string;
  span?: string;
  badgeClass: string;
  titleClass: string;
  bodyClass: string;
  photo?: boolean;
}[] = [
  {
    className: "bg-askari-navy",
    span: "lg:col-span-2 lg:row-span-2 min-h-[280px] lg:min-h-0",
    badgeClass: "bg-askari-gold text-askari-navy",
    titleClass: "text-askari-cream text-[22px]",
    bodyClass: "text-askari-cream/75 max-w-[320px]",
    photo: true,
  },
  {
    className: "bg-askari-gold",
    badgeClass: "bg-askari-navy text-askari-gold",
    titleClass: "text-askari-navy",
    bodyClass: "text-askari-navy/70",
  },
  {
    className: "bg-askari-navy",
    badgeClass: "bg-askari-cream/15 text-askari-gold",
    titleClass: "text-askari-cream",
    bodyClass: "text-askari-cream/65",
  },
  {
    className: "border border-askari-navy/10 bg-askari-white",
    badgeClass: "bg-askari-sand text-askari-navy",
    titleClass: "text-askari-navy",
    bodyClass: "text-askari-textBody2",
  },
  {
    className: "bg-askari-navySlate",
    badgeClass: "bg-askari-cream/15 text-askari-gold",
    titleClass: "text-askari-cream",
    bodyClass: "text-askari-cream/65",
  },
  {
    className: "border border-askari-navy/10 bg-askari-white",
    span: "lg:col-span-4",
    badgeClass: "bg-askari-sand text-askari-navy",
    titleClass: "text-askari-navy",
    bodyClass: "text-askari-textBody2",
  },
];

const UNIVERSITY_LOGOS = [
  "Sapienza, Rome",
  "Politecnico di Milano",
  "Università di Bologna",
  "Padova",
  "Torino",
  "Milano-Bicocca",
];

const FIELDS: { key: "name" | "email" | "whatsapp" | "intake"; l: string; ph: string; type?: string }[] = [
  { key: "name", l: "Name", ph: "Your full name" },
  { key: "email", l: "Email", ph: "you@example.com", type: "email" },
  { key: "whatsapp", l: "WhatsApp number", ph: "+92 3XX XXXXXXX" },
  { key: "intake", l: "Intended intake", ph: "Autumn 2027" },
];

export default function Home() {
  const { data: services } = useServices();
  const { data: packages } = usePricingPackages();
  const { data: testimonials } = useTestimonials();
  const { data: faqs } = useFaqs();
  const { data: siteSetting } = useSiteSetting();
  const { data: visaApprovals } = useVisaApprovals();
  const { data: blogPosts } = useBlogPosts();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  useMagneticButton(heroCtaRef);

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });
      tl.from(".hero-badge", { opacity: 0, y: -8 })
        .from(".hero-h1", { opacity: 0, y: 24 }, "-=0.45")
        .from(".hero-sub", { opacity: 0, y: 12 }, "-=0.45")
        .from(".hero-ctas > *", { opacity: 0, y: 12, stagger: 0.08 }, "-=0.4")
        .from(".hero-stats", { opacity: 0, y: 16 }, "-=0.35")
        .from(".hero-carousel", { opacity: 0, x: 24 }, "-=0.5");
    },
    { scope: heroRef }
  );

  usePageMeta(
    "Italy Study & Visa Consultants",
    "We take Pakistani students from shortlisting Italian universities to landing in Italy: applications, SOPs, FBR and NTN paperwork, embassy interviews and translations.",
    {
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Askari Consultants",
          url: "https://askariconsultants.pk",
          description:
            "Pakistan's study-in-Italy specialists: university admissions, visa filing, and documentation support.",
          areaServed: "PK",
          sameAs: [],
        },
        ...(faqs && faqs.length > 0
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              },
            ]
          : []),
      ],
    }
  );
  const submitLead = useSubmitLead();
  const leadSource = useLeadSource("home");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", intake: "", message: "" });

  const updateField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({ ...form, source: leadSource });
  };

  const [pdfPhone, setPdfPhone] = useState("");
  const handlePdfRequest = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      name: "Checklist request",
      email: "",
      whatsapp: pdfPhone,
      intake: "",
      message: "Requested the Italy 2027 document checklist PDF.",
      source: "home-pdf-checklist",
    });
    const msg = `Hi! Please send me the Italy 2027 study checklist PDF. My WhatsApp: ${pdfPhone}`;
    window.open(`https://wa.me/${WHATSAPP_PAKISTAN}?text=${encodeURIComponent(msg)}`, "_blank");
    setPdfPhone("");
  };

  const featuredTestimonials = (testimonials ?? []).filter((t) => t.featured).slice(0, 3);
  const steps = siteSetting?.processSteps ?? [];
  const reasons = siteSetting?.reasons ?? [];
  const cities = siteSetting?.cities ?? [];

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        className="dotted-bg relative isolate flex min-h-[calc(100vh-108px)] items-center overflow-hidden bg-askari-navy px-4 py-8 sm:px-6 md:px-10"
      >
        <SectionGlow corner="tr" color="gold" size={700} opacity={0.16} />
        <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-[1.2fr_.85fr]">
          <div>
            <div className="hero-badge mb-4 inline-flex items-center gap-2.5 rounded-full bg-askari-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-askari-navy">
              🇵🇰🇮🇹 Italy Student Visa &middot; 2026
            </div>
            <h1 className="hero-h1 text-balance font-display text-[34px] leading-[1.04] tracking-tight text-askari-cream sm:text-[46px] lg:text-[54px]">
              {visaApprovals?.length ?? "17"} Italy visas approved this season.{" "}
              <em className="text-askari-gold not-italic">Yours is next.</em>
            </h1>
            <p className="hero-sub mt-4 max-w-[520px] text-[14px] leading-relaxed text-askari-cream/80 sm:text-[15.5px]">
              Admissions, visa files, FBR and NTN paperwork, SOPs and embassy interview prep for
              Pakistani students going to Italy. One advisor from first call to landing.
            </p>
            <div className="hero-ctas mt-6 flex flex-wrap gap-3">
              <a
                ref={heroCtaRef}
                href={`https://wa.me/${WHATSAPP_ITALY}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <img src={whatsappIcon} alt="" className="h-[18px] w-[18px] object-contain" />
                Free consultation
              </a>
              <Link
                to="/approvals"
                className="btn-outline-light"
              >
                See all approvals →
              </Link>
            </div>
            <div className="hero-stats mt-6 flex flex-wrap gap-2.5">
              <HeroStat key="visas" n={String(visaApprovals?.length ?? 0)} l="visas this season" i={0} />
              <HeroStat key="days" n="42 days" l="average, file to visa" i={1} />
              <HeroStat key="reply" n="24h" l="reply time" i={2} />
            </div>
          </div>
          <div className="hero-carousel flex justify-center lg:justify-end">
            <ApprovalCarousel approvals={visaApprovals ?? []} />
          </div>
        </div>
      </section>

      {/* LOGO STRIP — auto-scrolling marquee */}
      <section className="overflow-hidden bg-askari-navy py-4">
        <div className="flex w-max animate-marquee gap-16 text-xs uppercase tracking-[0.14em] text-askari-cream/55">
          {[...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS].map((u, i) => (
            <span key={`${u}-${i}`} className="flex-none">
              {u}
            </span>
          ))}
        </div>
      </section>

      {/* ELIGIBILITY CHECK */}
      <section id="eligibility-quiz" className="dotted-bg relative bg-askari-navy px-4 py-16 text-askari-cream sm:px-6 md:px-10 md:py-24">
        <Reveal className="relative mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <div className="font-display text-xl italic text-askari-gold" style={{ fontStyle: "italic" }}>
              Free eligibility check
            </div>
            <h2 className="mt-2 text-display-2">
              Can you study in Italy? <em className="text-askari-gold not-italic">Find out in 30 seconds.</em>
            </h2>
            <p className="mt-4 max-w-[440px] text-[15.5px] leading-relaxed text-askari-cream/70">
              Tell us your level, marks and budget. An advisor replies on WhatsApp with
              universities that match.
            </p>
          </div>
          <EligibilityQuiz />
        </Reveal>
      </section>

      {/* VISA APPROVALS WALL */}
      <section className="dotted-bg relative isolate overflow-hidden bg-askari-sand px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <SectionGlow corner="tr" color="gold" size={620} opacity={0.3} />
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldDark">2026 visa approvals</div>
              <h2 className="mt-3.5 text-display-2">
                Real students. Real visas.
                <br />
                This year.
              </h2>
              <div className="mt-2 h-[3px] w-20 bg-askari-gold" />
              <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-askari-textBody">
                Every card is a 2026 Italy student visa filed by our team. Tap one to see the full poster.
              </p>
            </div>
            <a
              href="https://instagram.com/askariconsult"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-askari-navy px-5 py-3 text-[13px] font-semibold text-askari-cream transition-transform hover:-translate-y-0.5"
            >
              Follow new approvals
            </a>
          </div>
          <TrustStrip visaCount={visaApprovals?.length ?? 0} />
          <VisaApprovalsWall approvals={visaApprovals ?? []} limit={8} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/approvals"
              className="btn-secondary"
            >
              See all {visaApprovals?.length ?? ""} approvals &rarr;
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-dark"
            >
              Be the next one
            </a>
          </div>
        </Reveal>
      </section>

      {/* WHAT WE DO — bento grid */}
      <section className="relative isolate mx-auto max-w-[1280px] overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-28">
        <SectionGlow corner="tr" color="gold" size={560} opacity={0.16} />
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">Our services</div>
              <h2 className="mt-3.5 font-display text-[34px] leading-[1.04] tracking-tight sm:text-[46px] lg:text-[58px]">
                Six services. One advisor.
              </h2>
            </div>
            <Link
              to="/services"
              className="border-b border-askari-gold pb-0.5 text-[13px] font-semibold"
            >
              All services →
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-template-rows:repeat(3,auto)]">
            {(services ?? []).map((s, i) => {
              const bento = BENTO_STYLES[i % BENTO_STYLES.length];
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className={`lift-on-hover relative block min-h-[170px] overflow-hidden rounded-2xl p-6 ${bento.className} ${bento.span ?? ""}`}
                >
                  {bento.photo && (
                    <>
                      <img src={lectureHallImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-askari-navy/90 via-askari-navy/40 to-askari-navy/10" />
                    </>
                  )}
                  <div className="relative">
                    <div
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full font-display text-sm ${bento.badgeClass}`}
                    >
                      {s.num}
                    </div>
                    <div className={`mt-4 text-[10.5px] font-bold uppercase tracking-[0.1em] opacity-70 ${bento.titleClass}`}>
                      {s.num} &middot; {s.fee}
                    </div>
                    <div className={`mt-1.5 text-[17px] font-bold leading-snug ${bento.titleClass}`}>{s.name}</div>
                    <p className={`mt-2 text-[13px] leading-relaxed ${bento.bodyClass}`}>{s.short}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="relative isolate overflow-hidden bg-askari-navy px-4 py-16 text-askari-cream sm:px-6 md:px-10 md:py-28">
        <SectionGlow corner="br" color="gold" size={560} opacity={0.16} />
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-16">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">How it works</div>
              <h2 className="mt-3.5 font-display text-[34px] leading-[1.04] sm:text-[46px] lg:text-[58px]">
                Four steps to Italy
              </h2>
            </div>
            <p className="max-w-[400px] text-[15px] leading-relaxed text-askari-cream/60">
              This season our files took 42 days on average from submission to visa.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <div
                key={st.title}
                className="group border-t-2 border-askari-gold/45 pt-5 transition-colors hover:border-askari-coral"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-askari-gold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-askari-gold/15 text-[10px] font-bold text-askari-gold transition-colors group-hover:bg-askari-coral/20 group-hover:text-askari-coral">
                    {i + 1}
                  </span>
                  {st.when}
                </div>
                <div className="mt-3 font-display text-2xl leading-tight">{st.title}</div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-askari-cream/60">{st.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3.5 rounded-2xl border border-askari-cream/[0.14] bg-askari-cream/[0.06] px-6 py-6 md:mt-14">
            <div className="max-w-[560px] font-display text-xl leading-snug sm:text-[28px]">
              Starting late? Tell us your intake and we will say honestly whether it is still possible.
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_PAKISTAN}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Check my timeline
            </a>
          </div>
        </Reveal>
      </section>

      {/* WHY ASKARI */}
      <section className="mx-auto max-w-[1280px] overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-28">
        <Reveal className="grid items-center gap-10 sm:grid-cols-2">
          <div className="relative grid grid-cols-2 gap-4 py-4">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-askari-coral/15 blur-2xl" />
            <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-askari-gold/20 blur-2xl" />
            <img
              src={lectureHallImg}
              alt="Lecture hall"
              className="relative col-span-2 h-[260px] w-full -rotate-1 rounded-2xl object-cover shadow-[0_20px_40px_-20px_rgba(11,23,54,0.4)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            />
            <img
              src={milanCloisterImg}
              alt="Studying in a Milan cloister"
              className="relative h-[200px] w-full rotate-2 rounded-2xl object-cover shadow-[0_20px_40px_-20px_rgba(11,23,54,0.4)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            />
            <img
              src={campusLawnImg}
              alt="Campus lawn"
              className="relative h-[200px] w-full -rotate-2 rounded-2xl object-cover shadow-[0_20px_40px_-20px_rgba(11,23,54,0.4)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            />
          </div>
          <div className="sm:pl-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">Why Askari</div>
            <h2 className="mb-6 mt-3.5 text-display-2">
              We only do Italy. That is the whole advantage.
            </h2>
            {reasons.map((r, i) => (
              <div key={r.n} className="flex gap-4 border-b border-askari-navy/10 py-4">
                <span
                  className={`flex h-7 min-w-7 items-center justify-center rounded-full font-display text-[13px] text-askari-navy ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  }`}
                >
                  {r.n}
                </span>
                <div>
                  <div className="text-base font-semibold">{r.t}</div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-askari-textBody2">{r.b}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* RESOURCES HUB */}
      <section className="border-t border-askari-navy/[0.08] bg-askari-white px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">Free resources</div>
          <h2 className="mt-3.5 max-w-[640px] text-display-2">
            Everything you need to plan this yourself, before you ever pay us.
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              to="/universities"
              className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-cream p-6"
            >
              <span className="text-2xl">🎓</span>
              <div className="mt-3 font-display text-2xl leading-tight">University &amp; Programme Finder</div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-askari-textBody2">
                Search 67 universities and 450+ English-taught programmes, with real fees and deadlines.
              </p>
              <span className="mt-4 inline-block border-b border-askari-gold pb-0.5 text-[13px] font-semibold">
                Search now →
              </span>
            </Link>
            <Link
              to="/glossary"
              className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-cream p-6"
            >
              <span className="text-2xl">📖</span>
              <div className="mt-3 font-display text-2xl leading-tight">Glossary</div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-askari-textBody2">
                CIMEA, ISEE Parificato, permesso di soggiorno and 26 more terms, explained in plain English.
              </p>
              <span className="mt-4 inline-block border-b border-askari-gold pb-0.5 text-[13px] font-semibold">
                Browse terms →
              </span>
            </Link>
            <Link
              to="/checklist"
              className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-cream p-6"
            >
              <span className="text-2xl">✅</span>
              <div className="mt-3 font-display text-2xl leading-tight">Document Checklist</div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-askari-textBody2">
                Everything your file needs for a Bachelor's or Master's application, in one interactive list.
              </p>
              <span className="mt-4 inline-block border-b border-askari-gold pb-0.5 text-[13px] font-semibold">
                Open checklist →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* CITIES */}
      <section className="dotted-bg relative border-t border-askari-navy/[0.08] bg-askari-sand px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">
                Where our students go
              </div>
              <h2 className="mt-3.5 text-display-2">
                Six cities we place into every year
              </h2>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Ask about your city
            </a>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <div key={c.city} className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-white p-6">
                <div className="font-display text-[28px] leading-tight">{c.city}</div>
                <div className="mt-2 text-[13px] leading-relaxed text-askari-textBody2">{c.unis}</div>
                <div className="mt-4.5 flex justify-between gap-3 border-t border-askari-navy/10 pt-3.5 text-xs uppercase tracking-[0.1em] text-askari-goldMuted">
                  <span>{c.cost}</span>
                  <span>{c.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* URGENCY COUNTDOWN */}
      {siteSetting?.applicationDeadline && (
        <section className="dotted-bg-light relative isolate overflow-hidden bg-askari-gold px-4 py-8 sm:px-6 md:px-10">
          <Reveal className="relative mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
            <div className="font-display text-[26px] leading-tight text-askari-navy sm:text-[32px]">
              First-round applications close in
            </div>
            <CountdownTimer deadline={siteSetting.applicationDeadline} />
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Reserve my file slot
            </a>
          </Reveal>
        </section>
      )}

      {/* PACKAGES — tabbed */}
      <section className="relative isolate mx-auto max-w-[1280px] overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <SectionGlow corner="tr" color="gold" size={560} opacity={0.16} />
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">Packages</div>
              <h2 className="mt-3.5 text-display-2">
                Published prices. No surprises.
              </h2>
            </div>
            <Link to="/pricing" className="border-b border-askari-gold pb-0.5 text-[13px] font-semibold">
              Compare in detail →
            </Link>
          </div>
          <PackageTabs packages={packages ?? []} />
          <p className="mt-5 text-[12.5px] text-askari-textBody2">
            University, embassy and translation charges are paid directly by you.
          </p>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative isolate overflow-hidden border-t border-askari-navy/[0.08] bg-askari-white px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <SectionGlow corner="bl" color="gold" size={560} opacity={0.16} />
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="mb-9">
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">Student stories</div>
            <h2 className="mt-3.5 text-display-2">
              In their words
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((t, i) => (
              <div key={t.name} className="lift-on-hover rounded-2xl border border-askari-navy/10 bg-askari-cream p-6">
                <p className="font-display text-xl leading-snug sm:text-[27px]">“{t.quote}”</p>
                <div className="mt-4.5 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-askari-navy ${
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
                    <div className="text-[13px] font-semibold">{t.name}</div>
                    <div className="text-[12.5px] text-askari-textBody2">{t.where}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* BLOG TEASER */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="border-t border-askari-navy/[0.08] bg-askari-white px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <Reveal className="mx-auto max-w-[1280px]">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">From the blog</div>
                <h2 className="mt-3.5 text-display-2">
                  Insights and study-in-Italy tips
                </h2>
              </div>
              <Link to="/blog" className="border-b border-askari-gold pb-0.5 text-[13px] font-semibold">
                All articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Link
                to={`/blog/${blogPosts[0].slug}`}
                className="lift-on-hover flex flex-col justify-end rounded-2xl bg-askari-navy p-7 text-askari-cream sm:min-h-[340px] sm:p-9"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-askari-gold">
                  {blogPosts[0].category} · {blogPosts[0].readTime}
                </div>
                <div className="mt-3 font-display text-2xl leading-snug sm:text-[30px]">{blogPosts[0].title}</div>
                <p className="mt-3 max-w-[460px] text-[14px] leading-relaxed text-askari-cream/70">
                  {blogPosts[0].excerpt}
                </p>
              </Link>
              <div className="flex flex-col gap-4">
                {blogPosts.slice(1, 3).map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="lift-on-hover flex-1 rounded-2xl border border-askari-navy/10 bg-askari-cream p-6"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldDark">
                      {p.category} · {p.readTime}
                    </div>
                    <div className="mt-2 font-display text-xl leading-snug">{p.title}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-askari-textBody2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ELIGIBILITY / LEAD FORM */}
      <section className="dotted-bg relative isolate overflow-hidden bg-askari-navy px-4 py-16 text-askari-cream sm:px-6 md:px-10 md:py-24">
        <SectionGlow corner="br" color="gold" size={560} opacity={0.16} />
        <Reveal className="relative mx-auto grid max-w-[1280px] items-start gap-10 lg:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">
              Free eligibility check
            </div>
            <h2 className="mt-3.5 font-display text-[34px] leading-[1.04] sm:text-[44px] lg:text-[60px]">
              Tell us your marks. We will tell you your options.
            </h2>
            <p className="mb-7 mt-4.5 max-w-[460px] text-base leading-relaxed text-askari-cream/68">
              One working day for a written reply: which universities are realistic, what the
              total cost looks like, and what your file is missing.
            </p>
            <div className="flex max-w-[420px] flex-col gap-2.5">
              <a
                href={`https://wa.me/${WHATSAPP_ITALY}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl bg-askari-green px-5.5 py-4.5 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex items-center gap-3.5">
                  <img src={whatsappIcon} alt="" className="h-[30px] w-[30px] object-contain" />
                  <span>
                    <span className="block text-[10.5px] uppercase tracking-[0.18em] opacity-75">
                      WhatsApp · Italy
                    </span>
                    <span className="mt-1 block text-[17px] font-semibold">+39 350 876 9754</span>
                  </span>
                </span>
                <span className="text-lg">→</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_PAKISTAN}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-askari-cream/25 px-5.5 py-4.5 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex items-center gap-3.5">
                  <img src={whatsappIcon} alt="" className="h-[30px] w-[30px] object-contain" />
                  <span>
                    <span className="block text-[10.5px] uppercase tracking-[0.18em] opacity-60">
                      WhatsApp · Pakistan
                    </span>
                    <span className="mt-1 block text-[17px] font-semibold">+92 319 059 0938</span>
                  </span>
                </span>
                <span className="text-lg text-askari-gold">→</span>
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-askari-white p-6 text-askari-navy sm:p-9">
            <div className="font-display text-[28px] leading-tight">Send your details</div>
            <p className="mb-5.5 mt-2 text-[13.5px] text-askari-textBody2">No fee, no obligation.</p>
            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                    {f.l}
                  </span>
                  <input
                    type={f.type ?? "text"}
                    required={f.key === "name" || f.key === "email"}
                    value={form[f.key]}
                    onChange={updateField(f.key)}
                    placeholder={f.ph}
                    className="input-field"
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                  Marks &amp; target programme
                </span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={updateField("message")}
                  placeholder="e.g. 78% in FSc Pre-Engineering, want a BSc in Computer Science"
                  className="input-field resize-y"
                />
              </label>
              <button
                type="submit"
                disabled={submitLead.isPending}
                className="btn-secondary w-full py-4 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitLead.isSuccess
                  ? "Message sent — we will reply within a day"
                  : submitLead.isPending
                  ? "Sending…"
                  : "Send message"}
              </button>
              {submitLead.isError && (
                <p className="text-sm text-red-600">
                  Something went wrong — please message us on WhatsApp instead.
                </p>
              )}
              <p className="text-center text-[11.5px] text-askari-textBody2">
                We reply on WhatsApp within 24 hours. No spam, ever.
              </p>
            </form>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-askari-navy/[0.08] bg-askari-white px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <Reveal className="mx-auto grid max-w-[1280px] items-start gap-8 sm:grid-cols-2 lg:gap-16">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">FAQ</div>
            <h2 className="mt-3.5 text-display-2">
              Questions students ask first
            </h2>
            <p className="mb-5.5 mt-4.5 text-[15.5px] leading-relaxed text-askari-textBody">
              If yours is not here, send it. We answer questions before anyone pays anything.
            </p>
            <Link
              to="/contact"
              className="btn-primary"
            >
              Ask a question
            </Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {(faqs ?? []).map((f) => (
              <AccordionItem
                key={f.question}
                value={f.question}
                className="border-b border-askari-navy/[0.12] transition-colors hover:border-askari-coral/40"
              >
                <AccordionTrigger className="py-5 text-left text-[16.5px] font-semibold leading-snug hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14.5px] leading-relaxed text-askari-textBody">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* PDF LEAD MAGNET */}
      <section className="bg-askari-sand px-4 py-14 sm:px-6 md:px-10">
        <Reveal className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 rounded-2xl bg-askari-white p-7 sm:p-9">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-askari-gold text-2xl">
              📄
            </div>
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-askari-goldDark">Free PDF</div>
              <div className="mt-1 font-display text-lg font-bold leading-snug sm:text-xl">
                Italy 2027 Study Checklist
              </div>
              <p className="mt-1 text-[13.5px] text-askari-textBody2">
                Every document, deadline and fee for Italy 2027, in one PDF.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1.5 sm:w-auto">
            <form onSubmit={handlePdfRequest} className="flex w-full flex-wrap gap-2.5 sm:w-auto">
              <input
                type="text"
                required
                value={pdfPhone}
                onChange={(e) => setPdfPhone(e.target.value)}
                placeholder="Your WhatsApp number"
                className="input-field min-w-0 flex-1 sm:w-64"
              />
              <button
                type="submit"
                className="btn-primary flex-none"
              >
                Send me the checklist
              </button>
            </form>
            <p className="text-[11.5px] text-askari-textBody2">We reply on WhatsApp within 24 hours. No spam, ever.</p>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <img src={romeDuskImg} alt="Rome at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-askari-navy/95 to-askari-navy/60" />
        <div className="dotted-bg-light absolute inset-0" />
        <Reveal className="relative mx-auto max-w-[760px] text-center text-askari-cream">
          <h2 className="font-display text-[36px] leading-[1.04] sm:text-[50px] lg:text-[68px]">
            Send us your marks. We will tell you where you can get in.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-askari-cream/72">
            No fee for the first conversation. Reply within 24 hours, Monday to Friday.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-askari-gold px-7 py-4 text-sm font-semibold text-askari-navy transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              WhatsApp Italy · +39 350 876 9754
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_PAKISTAN}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-askari-cream/35 px-7 py-4 text-sm font-medium text-askari-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-askari-cream/10 active:translate-y-0"
            >
              WhatsApp Pakistan · +92 319 059 0938
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
