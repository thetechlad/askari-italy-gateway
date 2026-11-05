import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";

const HELPFUL_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  const location = useLocation();
  usePageMeta("Page Not Found");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <section className="dotted-bg relative flex min-h-[70vh] items-center overflow-hidden bg-askari-navy px-4 py-24 text-askari-cream">
      <Reveal className="relative mx-auto max-w-[560px] text-center">
        <div className="font-display text-7xl text-askari-gold">404</div>
        <p className="mt-4 text-lg text-askari-cream/80">This page does not exist.</p>
        <Link to="/" className="btn-primary mt-6">
          Return home
        </Link>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-askari-cream/[0.14] pt-6 text-[13px]">
          <span className="text-askari-cream/50">Try one of these:</span>
          {HELPFUL_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="font-medium text-askari-cream/80 hover:text-askari-gold">
              {l.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default NotFound;
