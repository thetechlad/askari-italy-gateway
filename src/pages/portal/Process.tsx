import { useRef } from "react";
import { useMyProcessSteps } from "@/hooks/usePortalData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { STEP_STATUS_LABELS, fileUrl, type PortalProcessStep } from "@/lib/portal";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/Reveal";
import { useRevealBatch } from "@/hooks/useRevealBatch";
import { EmptyState } from "@/components/EmptyState";
import { ListChecks, Paperclip } from "lucide-react";

const STATUS_STYLES: Record<PortalProcessStep["stepStatus"], { dot: string; badge: string }> = {
  NotStarted: { dot: "bg-askari-sand", badge: "bg-askari-sand text-askari-textBody2" },
  InProgress: { dot: "bg-askari-sky", badge: "bg-askari-sky/15 text-askari-sky" },
  Completed: { dot: "bg-askari-green", badge: "bg-askari-green/15 text-askari-green" },
  Blocked: { dot: "bg-askari-coral", badge: "bg-askari-coral/15 text-askari-coral" },
};

export default function PortalProcess() {
  usePageMeta("Your Process", "Step-by-step status of your Italy admission and visa journey.");
  const { data: steps, isLoading } = useMyProcessSteps();
  const timelineRef = useRef<HTMLDivElement>(null);
  useRevealBatch(timelineRef, ".reveal-item", [steps?.length ?? 0]);

  return (
    <div>
      {isLoading && (
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-80" />
          <div className="mt-8 flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="mt-1.5 h-3.5 w-3.5 flex-none rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-full max-w-[380px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && (!steps || steps.length === 0) && (
        <EmptyState icon={ListChecks} message="Your process steps haven't been set up yet. Please contact your advisor." />
      )}

      {!isLoading && steps && steps.length > 0 && (
        <>
      <h1 className="text-display-3">Your process</h1>
      <p className="mt-1 text-askari-textBody2">
        Every step of your admission and visa journey, and what's happening at each one.
      </p>

      <div ref={timelineRef} className="mt-8 flex flex-col">
        {steps.map((step, i) => {
          const style = STATUS_STYLES[step.stepStatus];
          const isLast = i === steps.length - 1;
          return (
            <div key={step.documentId} className="reveal-item flex gap-4">
              <div className="flex flex-col items-center">
                <span className={`mt-1.5 h-3.5 w-3.5 flex-none rounded-full ${style.dot}`} />
                {!isLast && <span className="w-px flex-1 bg-askari-navy/10" />}
              </div>
              <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-display text-xl leading-tight">{step.title}</div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${style.badge}`}>
                    {STEP_STATUS_LABELS[step.stepStatus]}
                  </span>
                </div>
                {step.details && (
                  <p className="mt-2 whitespace-pre-wrap text-[14.5px] leading-relaxed text-askari-textBody">
                    {step.details}
                  </p>
                )}
                {step.attachment && (
                  <a
                    href={fileUrl(step.attachment.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-askari-goldMuted hover:underline"
                  >
                    <Paperclip className="h-3.5 w-3.5" /> {step.attachment.name}
                  </a>
                )}
                {step.completedAt && (
                  <p className="mt-2 text-xs text-askari-textBody2">
                    Completed {new Date(step.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}
    </div>
  );
}
