import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMyMatchRuns, useMyStudent, useCreateApplication } from "@/hooks/usePortalData";
import { useSiteSetting } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { EmptyState } from "@/components/EmptyState";
import { SearchX } from "lucide-react";
import type { MatchResult } from "@/lib/portal";

type Tab = "overview" | "requirements" | "yourMatch";

function matchTag(total: number): { label: string; className: string } {
  if (total >= 85) return { label: "Excellent Match", className: "bg-askari-green/15 text-askari-green" };
  if (total >= 65) return { label: "Good Match", className: "bg-askari-gold/15 text-askari-goldDark" };
  return { label: "Possible Match", className: "bg-askari-sand text-askari-textBody2" };
}

export default function MatchDetail() {
  const { programType, programId } = useParams<{ programType: string; programId: string }>();
  usePageMeta("Match details", "Full requirements and recommended next steps for this programme.");
  const { data: matchRuns } = useMyMatchRuns();
  const { data: student } = useMyStudent();
  const { data: siteSetting } = useSiteSetting();
  const createApplication = useCreateApplication();
  const [tab, setTab] = useState<Tab>("overview");

  const latestRun = matchRuns?.find((r) => r.status === "Completed" && r.results);
  const allResults: MatchResult[] = latestRun?.results
    ? [...latestRun.results.meets, ...latestRun.results.needsVerification, ...latestRun.results.doesNotMeet]
    : [];
  const result = allResults.find((r) => r.programType === programType && String(r.programId) === programId);

  if (!result) {
    return <EmptyState icon={SearchX} message="We couldn't find this match — run a new shortlist from your results page." />;
  }

  const tag = result.scoreBreakdown ? matchTag(result.scoreBreakdown.total) : null;
  const requiredDocs = siteSetting?.documentChecklist?.[student?.level === "Bachelors" ? "bachelors" : "masters"] ?? [];

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
    <div>
      <Link to="/portal/results" className="text-sm font-semibold text-askari-goldMuted hover:underline">
        ← Back to results
      </Link>

      <Reveal>
        <div className="card-flat mt-4 flex flex-wrap items-start justify-between gap-4 bg-askari-white p-6">
          <div>
            <div className="font-display text-2xl">{result.universityName}</div>
            <div className="mt-1 text-askari-textBody2">{result.program}</div>
            {tag && (
              <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${tag.className}`}>
                {tag.label}
              </span>
            )}
          </div>
          {result.scoreBreakdown && (
            <div className="text-right">
              <div className="font-display text-3xl text-askari-goldDark">{Math.round(result.scoreBreakdown.total)}%</div>
              <div className="text-xs text-askari-textBody2">Fit score</div>
              {result.rank && <div className="mt-1 text-xs font-semibold text-askari-textBody2">Rank #{result.rank}</div>}
            </div>
          )}
        </div>
      </Reveal>

      <div className="mt-6 flex gap-1.5 overflow-x-auto border-b border-askari-navy/[0.08]">
        {(["overview", "requirements", "yourMatch"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-none px-4 py-2.5 text-sm font-semibold ${
              tab === t ? "border-b-2 border-askari-gold text-askari-navy" : "text-askari-textBody2"
            }`}
          >
            {t === "overview" ? "Overview" : t === "requirements" ? "Requirements" : "Your Match"}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <Reveal>
          <div className="card-flat mt-5 grid grid-cols-1 gap-4 bg-askari-white p-6 sm:grid-cols-2">
            <Field label="Study mode" value={result.display.studyMode === "PartTime" ? "Part time" : "Full time"} />
            <Field label="Duration" value={`${result.display.durationMonths} months`} />
            <Field
              label="Tuition"
              value={result.display.tuitionAnnual !== null ? `€${result.display.tuitionAnnual}/year` : "Income-based (ISEE)"}
            />
            <Field label="Application fee" value={result.display.applicationFeeEUR !== null ? `€${result.display.applicationFeeEUR}` : "N/A"} />
            <Field label="Application deadline" value={result.display.deadline || "Not yet published"} />
            <Field label="Classes start" value={result.display.classesStart || "Not yet published"} />
          </div>
          {result.display.tuitionNote && (
            <p className="mt-3 text-[13px] leading-relaxed text-askari-textBody2">{result.display.tuitionNote}</p>
          )}
        </Reveal>
      )}

      {tab === "requirements" && (
        <Reveal>
          <div className="card-flat mt-5 bg-askari-white p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">Academic requirement</div>
            <p className="mt-2 text-sm">
              {result.display.cgpaRequirementUnresolved
                ? "This university's published CGPA requirement couldn't be confirmed yet — check with your advisor."
                : result.display.minCGPAPercentage !== null
                ? `Minimum CGPA: ${result.display.minCGPAPercentage}%`
                : "No published CGPA requirement."}
            </p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">Language requirement</div>
            <p className="mt-2 text-sm">
              {result.display.languageRequirement && result.display.languageRequirement !== "None"
                ? `${result.display.languageRequirement}${result.display.languageMinScore ? ` (min ${result.display.languageMinScore})` : ""}`
                : "None published."}
            </p>
          </div>
          {requiredDocs.length > 0 && (
            <div className="card-flat mt-4 bg-askari-white p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">Required documents</div>
              <div className="mt-3 divide-y divide-askari-navy/[0.08]">
                {requiredDocs.map((d: { item: string; note: string }) => (
                  <div key={d.item} className="py-2.5">
                    <div className="text-sm font-semibold">{d.item}</div>
                    {d.note && <p className="mt-0.5 text-[13px] text-askari-textBody2">{d.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      )}

      {tab === "yourMatch" && (
        <Reveal>
          <div className="card-flat mt-5 bg-askari-white p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">Why this match</div>
            <p className="mt-2 text-sm leading-relaxed">{result.whyThisMatch}</p>
            {result.scoreBreakdown && (
              <div className="mt-4 flex flex-wrap gap-3 border-t border-askari-navy/10 pt-4 text-[12px] text-askari-textBody2">
                <span>Subject fit {Math.round(result.scoreBreakdown.subjectCareer * 100)}%</span>
                <span>Affordability {Math.round(result.scoreBreakdown.affordability * 100)}%</span>
                <span>Timing {Math.round(result.scoreBreakdown.timingReadiness * 100)}%</span>
              </div>
            )}
          </div>
          {result.recommendedActions.length > 0 && (
            <div className="card-flat mt-4 bg-askari-white p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">Recommended actions</div>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {result.recommendedActions.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-askari-green">✓</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.recommendedAreaOfStudy && (
            <div className="mt-4">
              <span className="rounded-full bg-askari-sand px-3 py-1.5 text-xs font-semibold text-askari-textBody2">
                {result.recommendedAreaOfStudy}
              </span>
            </div>
          )}
        </Reveal>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={handleApply}
          disabled={createApplication.isPending || createApplication.isSuccess}
          className="btn-primary disabled:opacity-60"
        >
          {createApplication.isSuccess ? "Added to applications" : createApplication.isPending ? "Adding…" : "Apply to this programme"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">{label}</div>
      <div className="mt-0.5 font-semibold">{value}</div>
    </div>
  );
}
