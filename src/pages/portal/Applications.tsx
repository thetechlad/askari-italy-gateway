import { useRef } from "react";
import { useMyApplications, useMoveApplication } from "@/hooks/usePortalData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Skeleton } from "@/components/ui/skeleton";
import { gsap, useGSAP, prefersMotion } from "@/lib/gsap";
import { APPLICATION_STATUS_LABELS, STUDENT_MOVABLE_STATUSES, type ApplicationStatus, type PortalApplication } from "@/lib/portal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DECISION_STATUSES: ApplicationStatus[] = ["OfferReceived", "Rejected", "Enrolled"];

function programLabel(app: PortalApplication): string {
  return app.university?.name || app.mastersProgram?.program || app.bachelorsProgram?.program || "Programme TBC";
}

function ApplicationCard({ app }: { app: PortalApplication }) {
  const moveApplication = useMoveApplication();
  const index = STUDENT_MOVABLE_STATUSES.indexOf(app.applicationStatus);

  const move = (direction: -1 | 1) => {
    const target = STUDENT_MOVABLE_STATUSES[index + direction];
    if (target) moveApplication.mutate({ id: app.id, applicationStatus: target });
  };

  return (
    <div className="card-flat bg-askari-white p-4">
      <div className="font-semibold">{programLabel(app)}</div>
      {(app.mastersProgram || app.bachelorsProgram) && app.university && (
        <p className="mt-1 text-sm text-askari-textBody2">{app.mastersProgram?.program || app.bachelorsProgram?.program}</p>
      )}
      {app.submittedAt && (
        <p className="mt-2 text-xs text-askari-textBody2">Submitted {new Date(app.submittedAt).toLocaleDateString()}</p>
      )}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={index <= 0 || moveApplication.isPending}
          className="rounded-full border border-askari-navy/15 p-1.5 disabled:opacity-30"
          aria-label="Move back"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={index < 0 || index >= STUDENT_MOVABLE_STATUSES.length - 1 || moveApplication.isPending}
          className="rounded-full border border-askari-navy/15 p-1.5 disabled:opacity-30"
          aria-label="Move forward"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function PortalApplications() {
  usePageMeta("Applications", "Track your own application pipeline, programme by programme.");
  const { data: applications, isLoading } = useMyApplications();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!prefersMotion() || isLoading) return;
      gsap.from(".portal-fade > *", { opacity: 0, y: 12, stagger: 0.08, duration: 0.5, ease: "power3.out" });
    },
    { scope: rootRef, dependencies: [isLoading] }
  );

  const movable = (applications ?? []).filter((a) => STUDENT_MOVABLE_STATUSES.includes(a.applicationStatus));
  const decisions = (applications ?? []).filter((a) => DECISION_STATUSES.includes(a.applicationStatus));

  return (
    <div ref={rootRef} className="portal-fade">
      <h1 className="text-display-3">Your applications</h1>
      <p className="mt-1 text-askari-textBody2">
        Add programmes from your matches, then track them through to submission. Your advisor takes it from there.
      </p>

      {isLoading && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && (applications?.length ?? 0) === 0 && (
        <p className="card-flat mt-6 bg-askari-white p-6 text-askari-textBody2">
          No applications yet — hit "Apply" on a match in your results to add one here.
        </p>
      )}

      {!isLoading && movable.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STUDENT_MOVABLE_STATUSES.map((status) => (
            <div key={status}>
              <div className="mb-2.5 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-askari-textBody2">
                  {APPLICATION_STATUS_LABELS[status]}
                </h2>
                <span className="rounded-full bg-askari-sand px-2 py-0.5 text-xs font-semibold text-askari-textBody2">
                  {movable.filter((a) => a.applicationStatus === status).length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {movable
                  .filter((a) => a.applicationStatus === status)
                  .map((app) => (
                    <ApplicationCard key={app.id} app={app} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {decisions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">Decisions</h2>
          <div className="mt-3 flex flex-col gap-3">
            {decisions.map((app) => (
              <div key={app.id} className="card-flat flex flex-wrap items-center justify-between gap-2 bg-askari-white p-5">
                <div>
                  <div className="font-display text-xl">{programLabel(app)}</div>
                  {(app.mastersProgram || app.bachelorsProgram) && (
                    <p className="mt-1.5 text-sm text-askari-textBody2">{app.mastersProgram?.program || app.bachelorsProgram?.program}</p>
                  )}
                </div>
                <span className="rounded-full bg-askari-sand px-3 py-1 text-xs font-semibold text-askari-navy">
                  {APPLICATION_STATUS_LABELS[app.applicationStatus]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
