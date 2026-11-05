import { useState } from "react";
import whatsappIcon from "@/assets/design/icon-whatsapp.webp";
import iconFacebook from "@/assets/design/icon-facebook.webp";
import iconInstagram from "@/assets/design/icon-instagram.webp";
import { WHATSAPP_ITALY, WHATSAPP_PAKISTAN } from "@/lib/contact";
import { useSiteSetting, useSubmitLead } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useLeadSource } from "@/hooks/useLeadSource";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";

const FIELDS: { key: "name" | "email" | "whatsapp" | "intake"; l: string; ph: string; type?: string }[] = [
  { key: "name", l: "Name", ph: "Your full name" },
  { key: "email", l: "Email", ph: "you@example.com", type: "email" },
  { key: "whatsapp", l: "WhatsApp number", ph: "+92 3XX XXXXXXX" },
  { key: "intake", l: "Intended intake", ph: "Autumn 2027" },
];

export default function Contact() {
  usePageMeta(
    "Contact",
    "Get in touch with Askari Consultants on WhatsApp or by message — we reply within one working day.",
    { path: "/contact" }
  );
  const { data: siteSetting } = useSiteSetting();
  const submitLead = useSubmitLead();
  const leadSource = useLeadSource("contact");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", intake: "", message: "" });
  const contactFacts = siteSetting?.contactFacts ?? [];

  const updateField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({ ...form, source: leadSource });
  };

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <SectionGlow corner="tr" color="gold" size={560} opacity={0.16} />
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Contact</div>
          <h1 className="text-display-1 mt-4">
            Start with a message.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-8 px-4 py-10 sm:px-6 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <a
            href={`https://wa.me/${WHATSAPP_ITALY}`}
            target="_blank"
            rel="noreferrer"
            className="mb-3 flex items-center justify-between gap-5 rounded-2xl bg-askari-green px-6.5 py-5.5 text-askari-cream"
          >
            <div className="flex items-center gap-3.5">
              <img src={whatsappIcon} alt="" className="h-[34px] w-[34px] object-contain" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] opacity-75">WhatsApp · Italy</div>
                <div className="mt-1.5 text-[19px] font-semibold">+39 350 876 9754</div>
              </div>
            </div>
            <span className="text-xl">→</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_PAKISTAN}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-5 rounded-2xl bg-askari-navy px-6.5 py-5.5 text-askari-cream"
          >
            <div className="flex items-center gap-3.5">
              <img src={whatsappIcon} alt="" className="h-[34px] w-[34px] object-contain" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] opacity-60">WhatsApp · Pakistan</div>
                <div className="mt-1.5 text-[19px] font-semibold">+92 319 059 0938</div>
              </div>
            </div>
            <span className="text-xl text-askari-gold">→</span>
          </a>

          <div className="mt-3 grid grid-cols-1 gap-px border border-askari-navy/10 bg-askari-navy/10 sm:grid-cols-2">
            {contactFacts.map((c) => (
              <div key={c.label} className="bg-askari-cream p-5.5">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-askari-goldMuted">
                  {c.label}
                </div>
                <div className="mt-2 text-[15px] leading-snug">{c.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://facebook.com/askariconsults"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-askari-navy/[0.14] px-4.5 py-2.5 text-[13px] font-medium"
            >
              <img src={iconFacebook} alt="" className="h-[18px] w-[18px] object-contain" />
              Facebook
            </a>
            <a
              href="https://instagram.com/askariconsult"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-askari-navy/[0.14] px-4.5 py-2.5 text-[13px] font-medium"
            >
              <img src={iconInstagram} alt="" className="h-[18px] w-[18px] rounded object-contain" />
              Instagram
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="card-flat bg-askari-white p-6 sm:p-9">
          <div className="text-display-3">Or send the details here</div>
          <p className="mb-6 mt-2.5 text-[13.5px] text-askari-textBody2">
            We reply within one working day.
          </p>
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
                Your question
              </span>
              <textarea
                rows={4}
                value={form.message}
                onChange={updateField("message")}
                placeholder="Degree, marks, target intake and city"
                className="input-field resize-y"
              />
            </label>
            <button
              type="submit"
              disabled={submitLead.isPending}
              className="btn-secondary w-full py-4 disabled:opacity-60"
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
        </Reveal>
      </section>
    </div>
  );
}
