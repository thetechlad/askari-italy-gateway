import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/design/logo.png";
import { WHATSAPP_ITALY } from "@/lib/contact";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useVisaApprovals } from "@/hooks/useStrapi";
import { mediaUrl } from "@/lib/strapi";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type MenuKey = "services" | null;

const FLAT_LINKS = [
  { label: "Pricing", to: "/pricing" },
  { label: "Approvals", to: "/approvals" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const ALL_MOBILE_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Visa Approvals", to: "/approvals" },
  { label: "University & Programme Finder", to: "/universities" },
  { label: "Glossary", to: "/glossary" },
  { label: "Document Checklist", to: "/checklist" },
  { label: "Stories", to: "/stories" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Student Login", to: "/portal/login" },
];

const SERVICE_GROUPS = [
  {
    label: "Admissions",
    items: [
      { num: "01", name: "University Admissions", desc: "Shortlisting, Universitaly", slug: "university-admissions" },
      { num: "04", name: "SOP & Documentation", desc: "SOP, CV, family documents", slug: "sop-documentation" },
      { num: "05", name: "Interview & Italian Language", desc: "Mock interviews, language", slug: "interview-italian-language" },
    ],
  },
  {
    label: "Visa & legal",
    items: [
      { num: "02", name: "Visa Filing Support", desc: "Full file, appointments", slug: "visa-filing-support" },
      { num: "03", name: "FBR, NTN & Tax Assistance", desc: "Registration and returns", slug: "fbr-ntn-tax-assistance" },
      { num: "06", name: "Translation & Apostille", desc: "Sworn translation, legalisation", slug: "translation-apostille" },
    ],
  },
];

function MegaPanel({ onClose, children, wide = false }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={`animate-float-in absolute left-4 right-4 top-full mx-auto grid max-w-[${wide ? "980" : "780"}px] grid-cols-1 gap-6 rounded-b-[20px] border border-t-0 border-askari-cream/10 bg-askari-navy p-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)] sm:grid-cols-2 ${wide ? "md:grid-cols-[1fr_1fr_.9fr]" : "md:grid-cols-2"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

function LatestApprovalCard() {
  const { data: approvals } = useVisaApprovals();
  const latest = approvals?.[0];
  if (!latest) return null;
  return (
    <div className="flex flex-col justify-between rounded-[16px] bg-askari-navyDark p-4">
      <div className="h-24 w-full overflow-hidden rounded-[10px] bg-askari-navySlate/40">
        {latest.photo && <img src={mediaUrl(latest.photo.url)} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="mt-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-askari-gold">Latest approval</div>
        <div className="mt-1 text-sm font-bold text-askari-cream">{latest.studentName}</div>
        {latest.university && <div className="text-xs text-askari-cream/60">{latest.university}</div>}
        <Link to="/approvals" className="mt-2 inline-block text-xs font-semibold text-askari-gold hover:underline">
          All approvals &rarr;
        </Link>
      </div>
    </div>
  );
}

const navLinkClass = (active: boolean) =>
  `rounded-md px-3 py-2 text-[13.5px] transition-colors ${
    active ? "font-semibold text-askari-gold" : "font-medium text-askari-cream/85 hover:text-askari-cream"
  }`;

export function Header({ scrolled = false }: { scrolled?: boolean }) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useMagneticButton(ctaRef);

  return (
    <header className="bg-askari-navy/95 backdrop-blur-md" onMouseLeave={() => setOpenMenu(null)}>
      <div
        className={`relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-6 md:px-10 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <Link to="/" className="flex flex-none items-center gap-2.5 text-askari-cream">
          <img src={logo} alt="" className="h-[30px] w-auto object-contain" />
          <span className="leading-[0.95]">
            <span className="block font-display text-[19px] font-extrabold lowercase tracking-tight">askari</span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.26em] text-askari-cream/55">Consultants</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          <Link to="/" className={navLinkClass(pathname === "/")}>
            Home
          </Link>
          <button
            onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
            onMouseEnter={() => setOpenMenu("services")}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-[13.5px] font-medium text-askari-cream/85 transition-colors hover:text-askari-cream"
          >
            Services <span className="text-[9px] opacity-60">&#9662;</span>
          </button>
          <Link to="/pricing" className={navLinkClass(pathname === "/pricing")}>
            Pricing
          </Link>
          <Link to="/approvals" className={navLinkClass(pathname === "/approvals")}>
            Approvals
          </Link>
          <Link to="/blog" className={navLinkClass(pathname.startsWith("/blog"))}>
            Blog
          </Link>
          {FLAT_LINKS.slice(2).map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass(pathname === link.to)}>
              {link.label}
            </Link>
          ))}

          {openMenu === "services" && (
            <MegaPanel onClose={() => setOpenMenu(null)} wide>
              {SERVICE_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="mb-3.5 text-[10px] uppercase tracking-[0.2em] text-askari-gold/80">{group.label}</div>
                  {group.items.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/services/${item.slug}`}
                      onClick={() => setOpenMenu(null)}
                      className="-mx-2.5 flex items-start gap-2.5 rounded-xl px-2.5 py-2 hover:bg-askari-cream/5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[10px] bg-askari-gold text-[9px] font-bold text-askari-navy">
                        {item.num}
                      </span>
                      <span>
                        <div className="text-sm font-semibold text-askari-cream">{item.name}</div>
                        <div className="mt-0.5 text-xs text-askari-cream/55">{item.desc}</div>
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
              <LatestApprovalCard />
            </MegaPanel>
          )}

        </nav>

        <a
          ref={ctaRef}
          href={`https://wa.me/${WHATSAPP_ITALY}`}
          target="_blank"
          rel="noreferrer"
          className="btn-glow-gold hidden flex-none items-center gap-2 rounded-xl bg-askari-gold px-5 py-2.5 text-[13px] font-bold text-askari-navy transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Free consultation
        </a>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="flex flex-none items-center justify-center rounded-md p-2 text-askari-cream lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-askari-cream">
            <nav className="mt-10 flex flex-col gap-1 overflow-y-auto">
              {ALL_MOBILE_LINKS.map((link) => (
                <SheetClose asChild key={link.to}>
                  <Link to={link.to} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-askari-sand">
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href={`https://wa.me/${WHATSAPP_ITALY}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 rounded-xl bg-askari-gold px-4 py-3 text-center text-sm font-bold text-askari-navy"
                >
                  Free consultation
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
