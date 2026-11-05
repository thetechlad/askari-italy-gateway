import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ExitIntent } from "@/components/ExitIntent";
import { ScrollTrigger } from "@/lib/gsap";
import { useScrollProgressBar, useScrolledPast } from "@/hooks/useScrollHeader";

export function Layout() {
  const { pathname } = useLocation();
  const progressRef = useScrollProgressBar<HTMLDivElement>();
  const scrolled = useScrolledPast(80);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Routes mount/unmount their own ScrollTriggers (Reveal, hero timeline, etc.) —
    // refresh so cached scroll-start positions aren't stale after navigation.
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-askari-cream font-sans text-askari-navy">
      <div className="sticky top-0 z-[100]">
        <TopBar scrolled={scrolled} />
        <Header scrolled={scrolled} />
        <div ref={progressRef} className="h-[2px] w-full bg-askari-gold" />
      </div>
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <ExitIntent />
    </div>
  );
}
