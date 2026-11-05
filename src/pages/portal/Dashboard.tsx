import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMyStudent, useMyApplications, useMyDocuments, useMyMatchRuns, useMyChecklistItems } from "@/hooks/usePortalData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { STAGES, STAGE_LABELS } from "@/lib/portal";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/EmptyState";
import { UserX } from "lucide-react";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";

export default function PortalDashboard() {
  usePageMeta("Overview", "Your application progress with Askari Consultants.");
  const { data: student, isLoading } = useMyStudent();
  const { data: applications } = useMyApplications();
  const { data: documents } = useMyDocuments();
  const { data: matchRuns } = useMyMatchRuns();
  const { data: checklistItems } = useMyChecklistItems();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!prefersMotion() || isLoading || !student) return;
      gsap.from(".portal-fade > *", { opacity: 0, y: 12, stagger: 0.08, duration: 0.5, ease: "power3.out" });
    },
    { scope: rootRef, dependencies: [isLoading, !!student] }
  );

  const isTerminal = student ? student.stage === "Lost" || student.stage === "VisaRefused" : false;
  const currentIndex = student ? STAGES.indexOf(student.stage as (typeof STAGES)[number]) : -1;

  const offersReceived = (applications ?? []).filter((a) => a.applicationStatus === "OfferReceived" || a.applicationStatus === "Enrolled").length;
  const pendingApplications = (applications ?? []).filter((a) => a.applicationStatus === "Submitted").length;
  const latestRun = matchRuns?.find((r) => r.status === "Completed" && r.results);
  const totalMatches = latestRun?.results
    ? latestRun.results.meets.length + latestRun.results.needsVerification.length + latestRun.results.doesNotMeet.length
    : 0;
  const topMatches = latestRun?.results?.meets.slice(0, 3) ?? [];

  const requiredItems = (checklistItems ?? []).filter((i) => i.required);
  const checklistDone = requiredItems.filter((i) => i.status === "Checked").length;

  return (
    <div ref={rootRef}>
      {isLoading && (
        <div>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-2 h-4 w-72" />
          <div className="mt-8 space-y-3 rounded-2xl border border-askari-navy/10 bg-askari-white p-6">
            <Skeleton className="h-3 w-28" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>
      )}

      {!isLoading && !student && <EmptyState icon={UserX} message="We couldn't find your student record. Please contact your advisor." />}

      {!isLoading && student && (
        <div className="portal-fade">
          <h1 className="text-display-3">Welcome, {student.firstName}</h1>
          <p className="mt-1 text-askari-textBody2">
            Here's where things stand with your Italy application.
          </p>

          {/* Overall progress */}
          <div className="card-flat mt-8 bg-askari-white p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">
                Overall progress
              </div>
              <Link
                to="/portal/process"
                className="text-[13px] font-semibold text-askari-goldMuted hover:underline"
              >
                View full process →
              </Link>
            </div>
            {isTerminal ? (
              <div className="font-display text-2xl">{STAGE_LABELS[student.stage] ?? student.stage}</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {STAGES.map((stage, i) => {
                  const isDone = i < currentIndex;
                  const isCurrent = i === currentIndex;
                  return (
                    <div
                      key={stage}
                      className={`rounded-full px-3.5 py-2 text-xs font-medium ${
                        isCurrent
                          ? "bg-askari-navy text-askari-cream"
                          : isDone
                          ? "bg-askari-gold/30 text-askari-navy"
                          : "bg-askari-sand text-askari-textBody2"
                      }`}
                    >
                      {STAGE_LABELS[stage]}
                    </div>
                  );
                })}
              </div>
            )}
            {requiredItems.length > 0 && (
              <p className="mt-4 text-sm text-askari-textBody2">
                Checklist: <span className="font-semibold text-askari-navy">{checklistDone} of {requiredItems.length}</span> required items verified
              </p>
            )}
            {student.targetIntake && (
              <p className="mt-1.5 text-sm text-askari-textBody2">
                Target intake: <span className="font-semibold text-askari-navy">{student.targetIntake}</span>
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card-flat bg-askari-white p-5">
              <div className="font-display text-3xl text-askari-goldMuted">{offersReceived}</div>
              <div className="mt-1 text-sm text-askari-textBody2">Offers received</div>
            </div>
            <div className="card-flat bg-askari-white p-5">
              <div className="font-display text-3xl text-askari-goldMuted">{pendingApplications}</div>
              <div className="mt-1 text-sm text-askari-textBody2">Pending applications</div>
            </div>
            <Link to="/portal/results" className="card-flat bg-askari-white p-5 hover:bg-askari-sand">
              <div className="font-display text-3xl text-askari-goldMuted">{totalMatches}</div>
              <div className="mt-1 text-sm text-askari-textBody2">Total matches</div>
            </Link>
            <Link to="/portal/documents" className="card-flat bg-askari-white p-5 hover:bg-askari-sand">
              <div className="font-display text-3xl text-askari-goldMuted">{documents?.length ?? 0}</div>
              <div className="mt-1 text-sm text-askari-textBody2">Documents uploaded</div>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Your top matches</h2>
                <Link to="/portal/results" className="text-[13px] font-semibold text-askari-goldMuted hover:underline">
                  See all →
                </Link>
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {topMatches.length === 0 && (
                  <div className="card-flat bg-askari-white p-5 text-sm text-askari-textBody2">
                    No matches yet — run your shortlist from the Results page.
                  </div>
                )}
                {topMatches.map((m) => (
                  <Link
                    key={`${m.programType}-${m.programId}`}
                    to={`/portal/matches/${m.programType}/${m.programId}`}
                    className="card-flat flex items-center justify-between gap-3 bg-askari-white p-4 hover:bg-askari-sand"
                  >
                    <div>
                      <div className="font-semibold">{m.program}</div>
                      <div className="text-sm text-askari-textBody2">{m.universityName}</div>
                    </div>
                    {m.scoreBreakdown && (
                      <span className="rounded-full bg-askari-gold/15 px-3 py-1 text-xs font-bold text-askari-goldDark">
                        {Math.round(m.scoreBreakdown.total)}%
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold">Quick actions</h2>
              <div className="mt-3 flex flex-col gap-2">
                <Link to="/portal/profile" className="card-flat bg-askari-white p-4 text-sm font-semibold hover:bg-askari-sand">
                  View profile
                </Link>
                <Link to="/portal/results" className="card-flat bg-askari-white p-4 text-sm font-semibold hover:bg-askari-sand">
                  My matches
                </Link>
                <Link to="/portal/applications" className="card-flat bg-askari-white p-4 text-sm font-semibold hover:bg-askari-sand">
                  Applications
                </Link>
                <Link to="/portal/scholarships" className="card-flat bg-askari-white p-4 text-sm font-semibold hover:bg-askari-sand">
                  Scholarships
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
