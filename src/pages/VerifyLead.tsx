import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "@/assets/design/logo.png";
import { usePortalAuth } from "@/contexts/PortalAuthContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSubmitVerifiedLead, useVerifyLeadCode } from "@/hooks/useStrapi";
import { useLeadSource } from "@/hooks/useLeadSource";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";

type Step = "capture" | "code";

export default function VerifyLead() {
  usePageMeta(
    "Start your study file",
    "Get your personal document checklist and 3 free university searches — verify your email to begin."
  );
  const { isAuthenticated, loginWithToken } = usePortalAuth();
  const navigate = useNavigate();
  const leadSource = useLeadSource("start");
  const submitLead = useSubmitVerifiedLead();
  const verifyCode = useVerifyLeadCode();

  const [step, setStep] = useState<Step>("capture");
  const [form, setForm] = useState({ name: "", email: "", intendedDegree: "Masters" as "Bachelors" | "Masters", intake: "" });
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const verifyRef = useRef<HTMLButtonElement>(null);
  useMagneticButton(submitRef);
  useMagneticButton(verifyRef);

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      gsap.from(".portal-fade > *", { opacity: 0, y: 12, stagger: 0.06, duration: 0.5, ease: "power3.out" });
    },
    { scope: rootRef, dependencies: [step] }
  );

  if (isAuthenticated) return <Navigate to="/portal" replace />;

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await submitLead.mutateAsync({ ...form, source: leadSource });
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start verification.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await verifyCode.mutateAsync({ email: form.email, code });
      loginWithToken(result.jwt);
      navigate("/portal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect or expired code.");
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
          {step === "capture" ? (
            <>
              <div className="inline-flex items-center rounded-full bg-askari-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-askari-goldDark">
                Free document checklist
              </div>
              <h1 className="text-display-3 mt-3">Start your study file.</h1>
              <p className="mb-6 mt-1.5 text-sm text-askari-textBody2">
                Get your personal checklist and 3 free university searches. We'll email you a code to verify.
              </p>
              <form className="flex flex-col gap-3.5" onSubmit={handleCapture}>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                    Full name
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="input-field"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="input-field"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                    Degree level
                  </span>
                  <select
                    value={form.intendedDegree}
                    onChange={(e) => setForm((f) => ({ ...f, intendedDegree: e.target.value as "Bachelors" | "Masters" }))}
                    className="input-field"
                  >
                    <option value="Masters">Masters</option>
                    <option value="Bachelors">Bachelors</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                    Intended intake
                  </span>
                  <input
                    type="text"
                    placeholder="Autumn 2027"
                    value={form.intake}
                    onChange={(e) => setForm((f) => ({ ...f, intake: e.target.value }))}
                    className="input-field"
                  />
                </label>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  ref={submitRef}
                  type="submit"
                  disabled={submitLead.isPending}
                  className="btn-primary mt-2 w-full disabled:opacity-60"
                >
                  {submitLead.isPending ? "Sending code…" : "Get my checklist"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="inline-flex items-center rounded-full bg-askari-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-askari-goldDark">
                Check your email
              </div>
              <h1 className="text-display-3 mt-3">Enter your code.</h1>
              <p className="mb-6 mt-1.5 text-sm text-askari-textBody2">
                We sent a 6-digit code to {form.email}.
              </p>
              <form className="flex flex-col gap-3.5" onSubmit={handleVerify}>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
                    Verification code
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="input-field text-center text-lg tracking-[0.3em]"
                  />
                </label>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  ref={verifyRef}
                  type="submit"
                  disabled={verifyCode.isPending || code.length !== 6}
                  className="btn-primary mt-2 w-full disabled:opacity-60"
                >
                  {verifyCode.isPending ? "Verifying…" : "Verify & continue"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("capture")}
                  className="text-center text-xs font-medium text-askari-textBody2 hover:underline"
                >
                  Wrong email? Go back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
