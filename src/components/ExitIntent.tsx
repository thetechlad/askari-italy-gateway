import { useEffect, useState } from "react";
import { WHATSAPP_ITALY } from "@/lib/contact";

export function ExitIntent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exitIntentShown")) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      setShow(true);
      sessionStorage.setItem("exitIntentShown", "1");
      document.removeEventListener("mouseleave", onMouseLeave);
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave);
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] hidden items-center justify-center bg-askari-navy/80 p-6 sm:flex"
      onClick={() => setShow(false)}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl bg-askari-white p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShow(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-askari-navy/50 hover:bg-askari-sand"
        >
          ✕
        </button>
        <div className="font-display text-2xl font-bold text-askari-navy">Leaving already?</div>
        <p className="mt-3 text-[14.5px] leading-relaxed text-askari-textBody">
          Sami got his Italy visa this year with a 2.98 CGPA. Ask us what's possible with your profile.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={`https://wa.me/${WHATSAPP_ITALY}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Ask on WhatsApp
          </a>
          <button
            onClick={() => setShow(false)}
            className="rounded-full px-6 py-3 text-sm font-medium text-askari-textBody2 hover:text-askari-navy"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
