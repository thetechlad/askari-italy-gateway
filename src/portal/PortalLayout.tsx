import { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/design/logo.png";
import { usePortalAuth } from "@/contexts/PortalAuthContext";
import { useMyStudent } from "@/hooks/usePortalData";
import { WalletBadge } from "@/components/portal/WalletBadge";
import { ScrollTrigger } from "@/lib/gsap";

const NAV = [
  { label: "Overview", to: "/portal" },
  { label: "Process", to: "/portal/process" },
  { label: "Applications", to: "/portal/applications" },
  { label: "Documents", to: "/portal/documents" },
  { label: "My profile", to: "/portal/profile" },
  { label: "My results", to: "/portal/results" },
  { label: "Scholarships", to: "/portal/scholarships" },
];

export function PortalLayout() {
  const { logout } = usePortalAuth();
  const { data: student } = useMyStudent();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/portal/login");
  };

  return (
    <div className="min-h-screen bg-askari-cream font-sans text-askari-navy">
      <header className="dotted-bg relative overflow-hidden bg-askari-navy px-4 py-4 text-askari-cream sm:px-8">
        <div className="relative flex items-center justify-between">
          <Link to="/portal" className="flex items-center gap-2.5">
            <img src={logo} alt="" className="h-8 w-auto object-contain" />
            <span className="leading-[0.95]">
              <span className="block font-display text-[17px] font-extrabold lowercase tracking-tight">askari</span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-askari-cream/55">
                Student Portal
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {student && (
              <span className="hidden text-sm font-medium text-askari-cream/80 sm:inline">Hi, {student.firstName}</span>
            )}
            <WalletBadge />
            <button
              onClick={handleLogout}
              className="rounded-full border border-askari-cream/25 px-4 py-2 text-xs font-semibold transition-colors hover:bg-askari-cream/10"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <nav className="flex gap-1.5 overflow-x-auto border-b border-askari-navy/[0.08] bg-askari-white px-4 py-3 sm:px-8">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex-none rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              location.pathname === item.to
                ? "btn-glow-gold bg-askari-gold text-askari-navy"
                : "text-askari-textBody hover:bg-askari-sand"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}
