import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  message,
  action,
}: {
  icon: LucideIcon;
  message: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-14 text-center text-askari-textBody2">
      <Icon className="h-9 w-9 text-askari-navy/25" strokeWidth={1.5} />
      <p>{message}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-1 text-[13px] font-semibold text-askari-goldDark hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
