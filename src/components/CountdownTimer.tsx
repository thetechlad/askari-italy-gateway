import { useEffect, useState } from "react";

function getParts(deadline: Date) {
  const diff = Math.max(0, deadline.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

export function CountdownTimer({ deadline }: { deadline: string }) {
  const target = new Date(deadline);
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  const UNITS: { key: keyof typeof parts; label: string }[] = [
    { key: "days", label: "days" },
    { key: "hours", label: "hours" },
    { key: "mins", label: "mins" },
    { key: "secs", label: "secs" },
  ];

  return (
    <div className="flex gap-2.5">
      {UNITS.map((u) => (
        <div key={u.key} className="flex min-w-[66px] flex-col items-center rounded-xl bg-askari-navy px-3 py-2.5">
          <span className="font-display text-2xl leading-none text-askari-gold tabular-nums sm:text-[28px]">
            {String(parts[u.key]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.1em] text-askari-cream/55">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
