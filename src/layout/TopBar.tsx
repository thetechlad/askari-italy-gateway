import { Facebook, Instagram } from "lucide-react";
import { WHATSAPP_ITALY, WHATSAPP_PAKISTAN } from "@/lib/contact";
import { useSiteSetting } from "@/hooks/useStrapi";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function TopBar({ scrolled = false }: { scrolled?: boolean }) {
  const { data: siteSetting } = useSiteSetting();
  return (
    <div
      className={`hidden items-center justify-between gap-4 overflow-hidden bg-askari-navyDark px-4 text-[12px] text-askari-cream/75 transition-[max-height,opacity,padding] duration-300 sm:px-6 md:flex md:px-10 ${
        scrolled ? "max-h-0 py-0 opacity-0" : "max-h-10 py-2 opacity-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <span>
          IT <a href={`tel:+${WHATSAPP_ITALY}`} className="hover:text-askari-cream">+39 350 876 9754</a>
        </span>
        <span className="h-3 w-px bg-askari-cream/20" />
        <span>
          PK <a href={`tel:+${WHATSAPP_PAKISTAN}`} className="hover:text-askari-cream">+92 319 059 0938</a>
        </span>
        <span className="h-3 w-px bg-askari-cream/20" />
        <span>Mon&ndash;Fri, 9 AM &ndash; 6 PM</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-askari-gold">2027 intake open</span>
        <div className="flex items-center gap-2.5">
          {siteSetting?.facebook && (
            <a href={siteSetting.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-askari-cream/70 hover:text-askari-gold">
              <Facebook className="h-[15px] w-[15px]" />
            </a>
          )}
          {siteSetting?.instagram && (
            <a href={siteSetting.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-askari-cream/70 hover:text-askari-gold">
              <Instagram className="h-[15px] w-[15px]" />
            </a>
          )}
          <a href={`https://wa.me/${WHATSAPP_ITALY}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-askari-cream/70 hover:text-askari-gold">
            <WhatsAppIcon className="h-[15px] w-[15px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
