import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyChecklistItems, useMyMatchRuns, useRunMatch, useMyStudent, useCreateApplication } from "@/hooks/usePortalData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { Reveal } from "@/components/Reveal";
import { WalletBadge } from "@/components/portal/WalletBadge";
import type { MatchResult } from "@/lib/portal";

const PAGE_SIZE = 12;

function matchTag(total: number): { label: string; className: string } {
  if (total >= 85) return { label: "Excellent Match", className: "bg-askari-green/15 text-askari-green" };
  if (total >= 65) return { label: "Good Match", className: "bg-askari-gold/15 text-askari-goldDark" };
  return { label: "Possible Match", className: "bg-askari-sand text-askari-textBody2" };
}

function ResultCard({ result }: { result: MatchResult }) {
  const navigate = useNavigate();
  const createApplication = useCreateApplication();
  const tag = result.scoreBreakdown ? matchTag(result.scoreBreakdown.total) : null;

  const handleApply = () => {
    if (result.universityId === null) return;
    createApplication.mutate({
      universityId: result.universityId,
      ...(result.programType === "masters-program"
        ? { mastersProgramId: result.programId }
        : { bachelorsProgramId: result.programId }),
    });
  };

  return (
    <div className="card-flat bg-askari-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-semibold">{result.program}</div>
          <div className="text-sm text-askari-textBody2">{result.universityName}</div>
        </div>
        {result.scoreBreakdown && (
          <span className="rounded-full bg-askari-gold/15 px-3 py-1 text-xs font-bold text-askari-goldDark">
            Fit {Math.round(result.scoreBreakdown.total)}/100
          </span>
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {tag && <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tag.className}`}>{tag.label}</span>}
        {result.recommendedAreaOfStudy && (
          <span className="rounded-full bg-askari-sand px-2.5 py-1 text-[11px] font-semibold text-askari-textBody2">
            {result.recommendedAreaOfStudy}
          </span>
        )}
        {result.display.languageRequirement && result.display.languageRequirement !== "None" && (
          <span className="rounded-full bg-askari-sky/15 px-2.5 py-1 text-[11px] font-semibold text-askari-sky">
            {result.display.languageRequirement}
          </span>
        )}
      </div>

      <ul className="mt-2.5 flex flex-col gap-1 text-sm text-askari-textBody2">
        {result.reasons.map((reason, i) => (
          <li key={i}>• {reason}</li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-askari-navy/10 pt-3 text-[12.5px] text-askari-textBody2">
        <span>{result.display.studyMode === "PartTime" ? "Part time" : "Full time"}</span>
        <span>{result.display.durationMonths} months</span>
        <span>{result.display.tuitionAnnual !== null ? `€${result.display.tuitionAnnual}/year` : "Income-based (ISEE)"}</span>
        {result.display.deadline && <span>Deadline {result.display.deadline}</span>}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => navigate(`/portal/matches/${result.programType}/${result.programId}`)}
          className="btn-outline-dark !px-4 !py-2 text-sm"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={handleApply}
          disabled={createApplication.isPending || createApplication.isSuccess}
          className="btn-primary !px-4 !py-2 text-sm disabled:opacity-60"
        >
          {createApplication.isSuccess ? "Added to applications" : createApplication.isPending ? "Adding…" : "Apply"}
        </button>
      </div>
    </div>
  );
}

function ResultSection({ title, results, dim }: { title: string; results: MatchResult[]; dim?: boolean }) {
  const [page, setPage] = useState(1);
  if (results.length === 0) return null;
  const visible = results.slice(0, page * PAGE_SIZE);

  return (
    <div>
      <h2 className={`text-lg font-bold ${dim ? "text-askari-textBody2" : ""}`}>
        {title} <span className="font-normal text-askari-textBody2">({results.length})</span>
      </h2>
      <div className={`mt-3 flex flex-col gap-3 ${dim ? "opacity-70" : ""}`}>
        {visible.map((r) => (
          <ResultCard key={`${r.programType}-${r.programId}`} result={r} />
        ))}
      </div>
      {visible.length < results.length && (
        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          className="btn-outline-dark mt-3 !px-4 !py-2 text-sm"
        >
          Show {Math.min(PAGE_SIZE, results.length - visible.length)} more
        </button>
      )}
    </div>
  );
}

export default function PortalResults() {
  usePageMeta("My results", "Your university matches — explained, with reasons and next steps.");
  const { data: student } = useMyStudent();
  const { data: checklistItems } = useMyChecklistItems();
  const { data: matchRuns, isLoading: loadingRuns } = useMyMatchRuns();
  const runMatchMutation = useRunMatch();
  const runRef = useRef<HTMLButtonElement>(null);
  useMagneticButton(runRef);

  const requiredItems = (checklistItems ?? []).filter((i) => i.required);
  const ready = requiredItems.length > 0 && requiredItems.every((i) => i.status === "Checked");
  const balance = student?.creditBalance ?? 0;
  const latestRun = matchRuns?.find((r) => r.status === "Completed" && r.results);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-display-3">My results</h1>
        <WalletBadge />
      </div>

      {!ready && (
        <Reveal>
          <div className="card-flat mt-4 bg-askari-sand p-5 text-sm">
            Finish your checklist to unlock matching.{" "}
            <Link to="/portal/documents" className="font-semibold text-askari-goldDark hover:underline">
              Go to your checklist →
            </Link>
          </div>
        </Reveal>
      )}

      {ready && (
        <Reveal>
          <div className="card-flat mt-4 flex flex-wrap items-center justify-between gap-3 bg-askari-white p-5">
            <p className="text-sm text-askari-textBody2">
              {balance > 0
                ? "Run a match to see which programmes you qualify for."
                : "You're out of credits — book a consultant for a review."}
            </p>
            <button
              ref={runRef}
              type="button"
              onClick={() => runMatchMutation.mutate()}
              disabled={balance === 0 || runMatchMutation.isPending}
              className="btn-primary disabled:opacity-50"
            >
              {runMatchMutation.isPending ? "Running…" : "Run my shortlist · 1 credit"}
            </button>
          </div>
          {runMatchMutation.isError && (
            <p className="mt-2 text-sm text-red-600">
              {runMatchMutation.error instanceof Error ? runMatchMutation.error.message : "Could not run a match."}
            </p>
          )}
        </Reveal>
      )}

      {loadingRuns && <p className="mt-6 text-sm text-askari-textBody2">Loading your results…</p>}

      {latestRun?.results && (
        <div className="mt-8 flex flex-col gap-8">
          <ResultSection title="Meets published criteria" results={latestRun.results.meets} />
          <ResultSection title="Needs verification" results={latestRun.results.needsVerification} />
          <ResultSection title="Does not meet published criteria" results={latestRun.results.doesNotMeet} dim />
        </div>
      )}
    </div>
  );
}
