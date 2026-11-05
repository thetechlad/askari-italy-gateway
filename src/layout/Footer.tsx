import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/design/logo.png";
import iconFacebook from "@/assets/design/icon-facebook.webp";
import iconInstagram from "@/assets/design/icon-instagram.webp";
import iconWhatsapp from "@/assets/design/icon-whatsapp.webp";
import { WHATSAPP_ITALY, WHATSAPP_PAKISTAN, CONTACT_EMAIL } from "@/lib/contact";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { SectionGlow } from "@/components/SectionGlow";

const PAGES = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Visa Approvals", to: "/approvals" },
  { label: "Success stories", to: "/stories" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const RESOURCE_PAGES = [
  { label: "University & Programme Finder", to: "/universities" },
  { label: "Glossary", to: "/glossary" },
  { label: "Document Checklist", to: "/checklist" },
];

const APP_PAGES = [
  { label: "Start My Study File", to: "/start" },
  { label: "Student Portal Login", to: "/portal/login" },
  { label: "How to Use the Platform", to: "/guide" },
];

export function Footer() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useMagneticButton(ctaRef);

  return (
    <>
      <div className="bg-askari-gold px-4 py-10 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
          <div className="font-display text-[28px] leading-tight text-askari-navy sm:text-[36px]">
            <span className="block italic" style={{ fontStyle: "italic" }}>
              Your Journey,
            </span>
            <span className="block not-italic">Our Priority.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:+${WHATSAPP_PAKISTAN}`}
              className="rounded-xl border-2 border-askari-navy px-6 py-3.5 text-sm font-bold text-askari-navy"
            >
              +92 319 059 0938
            </a>
            <a
              ref={ctaRef}
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Start on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <footer className="relative isolate overflow-hidden bg-askari-navy px-4 pb-[76px] pt-14 text-askari-cream sm:px-6 sm:pb-8 md:px-10 md:pt-20">
      <SectionGlow corner="bl" color="gold" size={600} opacity={0.1} />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-8 border-b border-askari-cream/[0.14] pb-11 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="Askari Consultants" className="mb-2.5 h-11 w-auto object-contain" />
            <div className="font-display text-[28px]">Askari Consultants</div>
            <p className="mt-3 max-w-[280px] text-[13.5px] leading-relaxed text-askari-cream/60">
              Italy admissions, visas and legal documentation for Pakistani students.
            </p>
          </div>
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-askari-gold">Pages</div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {PAGES.map((p) => (
                <Link key={p.to} to={p.to} className="text-askari-cream/75 hover:text-askari-cream">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-askari-gold">Resources</div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {RESOURCE_PAGES.map((p) => (
                <Link key={p.to} to={p.to} className="text-askari-cream/75 hover:text-askari-cream">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-askari-gold">App</div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {APP_PAGES.map((p) => (
                <Link key={p.to} to={p.to} className="text-askari-cream/75 hover:text-askari-cream">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-askari-gold">Contact</div>
            <div className="flex flex-col gap-2.5 text-[13.5px] text-askari-cream/75">
              <a href={`https://wa.me/${WHATSAPP_ITALY}`} target="_blank" rel="noreferrer">
                +39 350 876 9754
              </a>
              <a href={`https://wa.me/${WHATSAPP_PAKISTAN}`} target="_blank" rel="noreferrer">
                +92 319 059 0938
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>Karachi · Lahore · Islamabad</span>
              <span>Mon–Fri, 9 AM – 6 PM</span>
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-askari-gold">Follow</div>
            <div className="flex flex-col gap-3 text-[13.5px]">
              <a
                href="https://facebook.com/askariconsults"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-askari-cream/75 hover:text-askari-cream"
              >
                <img src={iconFacebook} alt="" className="h-5 w-5 object-contain" />
                Facebook
              </a>
              <a
                href="https://instagram.com/askariconsult"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-askari-cream/75 hover:text-askari-cream"
              >
                <img src={iconInstagram} alt="" className="h-5 w-5 rounded object-contain" />
                Instagram
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_ITALY}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-askari-cream/75 hover:text-askari-cream"
              >
                <img src={iconWhatsapp} alt="" className="h-5 w-5 object-contain" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 pt-6 text-xs text-askari-cream/45">
          <span>© 2026 Askari Consultants. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use</span>
        </div>
      </div>
    </footer>
    </>
  );
}
