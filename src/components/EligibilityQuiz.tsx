import { useState } from "react";
import { WHATSAPP_PAKISTAN } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type Level = "Bachelors" | "Masters" | "MBBS";

const LEVELS: Level[] = ["Bachelors", "Masters", "MBBS"];
const BUDGETS = ["Under €5k", "€5k–10k", "€10k+"];

export function EligibilityQuiz() {
  const [level, setLevel] = useState<Level>("Masters");
  const [marks, setMarks] = useState("");
  const [budget, setBudget] = useState(BUDGETS[1]);

  const waMessage = `Hi! I used the eligibility check on the website.\nLevel: ${level}\nCGPA/%: ${marks || "not given"}\nYearly budget: ${budget}\nCan you tell me what's realistic for me?`;

  return (
    <div className="card-raised bg-askari-white p-6 text-askari-navy sm:p-8">
      <div className="font-display text-2xl">Your profile</div>

      <div className="mt-5">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">Level</span>
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
                level === l
                  ? "border-askari-gold bg-askari-gold/15 text-askari-navy"
                  : "border-askari-navy/10 text-askari-textBody hover:border-askari-navy/20"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">CGPA / %</span>
          <input
            type="text"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="e.g. 3.2"
            className="input-field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">Yearly budget</span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="input-field"
          >
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_PAKISTAN}?text=${encodeURIComponent(waMessage)}`}
        target="_blank"
        rel="noreferrer"
        className="btn-primary mt-6 w-full"
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        Check on WhatsApp
      </a>
      <p className="mt-2.5 text-center text-[11.5px] text-askari-textBody2">Opens WhatsApp with your answers filled in</p>
    </div>
  );
}
