import { useState } from "react";
import iconWhatsapp from "@/assets/design/icon-whatsapp.webp";
import logo from "@/assets/design/logo.png";
import { WHATSAPP_ITALY, WHATSAPP_PAKISTAN } from "@/lib/contact";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop chat widget */}
      <div className="fixed bottom-[22px] right-[22px] z-[90] hidden sm:block">
        {open && (
          <div className="mb-3 w-[300px] overflow-hidden rounded-2xl bg-askari-white shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2.5 bg-askari-whatsappDark p-3.5 text-white">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-askari-navy">
                <img src={logo} alt="" className="w-[26px]" />
              </span>
              <span>
                <span className="block text-sm font-bold">Askari Consultants</span>
                <span className="block text-[11.5px] opacity-80">Typically replies within an hour</span>
              </span>
            </div>
            <div className="p-4">
              <div className="rounded-xl rounded-tl-sm bg-askari-sand px-3.5 py-2.5 text-[13.5px] leading-relaxed text-askari-navy">
                Assalam o Alaikum! Which intake are you planning for?
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_ITALY}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3.5 flex items-center justify-center gap-2 rounded-xl bg-askari-whatsapp py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <img src={iconWhatsapp} alt="" className="h-[18px] w-[18px] object-contain" />
                Start chat
              </a>
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Chat on WhatsApp"
          className="flex h-[62px] w-[62px] animate-pulse-ring items-center justify-center rounded-full bg-askari-whatsapp shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100"
        >
          <img src={iconWhatsapp} alt="" className="h-[34px] w-[34px] object-contain" />
        </button>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-[90] grid grid-cols-3 gap-px bg-askari-navy/10 sm:hidden">
        <a
          href={`https://wa.me/${WHATSAPP_ITALY}`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-askari-cream text-[11.5px] font-bold text-askari-navy"
        >
          <img src={iconWhatsapp} alt="" className="h-[22px] w-[22px] object-contain" />
          WhatsApp
        </a>
        <a
          href={`tel:+${WHATSAPP_PAKISTAN}`}
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-askari-cream text-[11.5px] font-bold text-askari-navy"
        >
          <span className="text-base leading-none">📞</span>
          Call
        </a>
        <a
          href="#eligibility-quiz"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-askari-gold text-[11.5px] font-bold text-askari-navy"
        >
          <span className="text-base leading-none">✓</span>
          Check eligibility
        </a>
      </div>
    </>
  );
}
