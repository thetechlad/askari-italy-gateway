import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "@/assets/design/logo.png";
import { usePortalAuth } from "@/contexts/PortalAuthContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { WHATSAPP_ITALY } from "@/lib/contact";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";

export default function PortalLogin() {
  usePageMeta("Student Login", "Log in to your Askari Consultants student portal.");
  const { isAuthenticated, login } = usePortalAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  useMagneticButton(submitRef);

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      gsap.from(".portal-fade > *", { opacity: 0, y: 12, stagger: 0.06, duration: 0.5, ease: "power3.out" });
    },
    { scope: rootRef }
  );

  if (isAuthenticated) return <Navigate to="/portal" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={rootRef} className="dotted-bg relative flex min-h-screen items-center justify-center overflow-hidden bg-askari-navy px-4">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-askari-gold/15 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-askari-gold/10 blur-[100px]" />

      <div className="portal-fade relative w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo} alt="" className="h-11 w-auto object-contain" />
          <div className="mt-3 font-display text-2xl font-extrabold tracking-tight text-askari-cream">
            askari <span className="text-askari-gold">consultants</span>
          </div>
        </div>

        <div className="card-raised bg-askari-white p-8">
          <div className="inline-flex items-center rounded-full bg-askari-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-askari-goldDark">
            Student Portal
          </div>
          <h1 className="text-display-3 mt-3">
            Welcome back.
          </h1>
          <p className="mb-6 mt-1.5 text-sm text-askari-textBody2">
            Log in with the details your advisor gave you.
          </p>
          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                Password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              ref={submitRef}
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 w-full disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-askari-textBody2">
            Don't have an account yet?{" "}
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-askari-goldDark"
            >
              Ask your advisor on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
