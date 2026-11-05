import { useEffect, useState } from "react";
import { useRegionalScholarships } from "@/hooks/useStrapi";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";

const PAGE_SIZE = 20;

function SkeletonRows({ cols }: { cols: number }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-askari-navy/[0.06] last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-3.5">
              <Skeleton className="h-4 w-full max-w-[160px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

function Pager({ page, pageCount, onPage }: { page: number; pageCount: number; onPage: (p: number) => void }) {
  if (pageCount <= 1) return null;
  return (
    <div className="mt-6 flex items-center justify-center gap-3 text-sm">
      <button
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="rounded-full border border-askari-navy/[0.14] px-4 py-2 disabled:opacity-30"
      >
        Previous
      </button>
      <span className="text-askari-textBody2">
        Page {page} of {pageCount}
      </span>
      <button
        disabled={page >= pageCount}
        onClick={() => onPage(page + 1)}
        className="rounded-full border border-askari-navy/[0.14] px-4 py-2 disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}

/**
 * Shared between the public /universities page and the portal's
 * /portal/scholarships page — one implementation reused by both, backed by
 * the existing public regional-scholarship API (no auth needed).
 */
export function ScholarshipsBrowser() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebouncedValue(search, 300);
  const { data, isLoading } = useRegionalScholarships({ page, pageSize: PAGE_SIZE, search: debounced });

  return (
    <div>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search by university name…"
        className="w-full max-w-md rounded-xl border border-askari-navy/[0.14] bg-askari-white px-4 py-3 text-sm outline-none focus:border-askari-gold"
      />
      <div className="mt-6 overflow-x-auto rounded-2xl border border-askari-navy/10 bg-askari-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-askari-navy/10 text-xs uppercase tracking-wide text-askari-textBody2">
            <tr>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Regional agency</th>
              <th className="px-4 py-3">Opening date</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <SkeletonRows cols={5} />}
            {!isLoading && data?.data.length === 0 && (
              <tr>
                <td colSpan={5}>
                  <EmptyState icon={SearchX} message="No scholarships match your search." />
                </td>
              </tr>
            )}
            {data?.data.map((s) => (
              <tr key={s.id} className="border-b border-askari-navy/[0.06] last:border-0">
                <td className="px-4 py-3 font-medium">{s.universityName}</td>
                <td className="px-4 py-3">{s.regionalAgency}</td>
                <td className="px-4 py-3">{s.openingDate || "—"}</td>
                <td className="px-4 py-3">{s.deadline || "—"}</td>
                <td className="px-4 py-3">{s.status || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && <Pager page={page} pageCount={data.meta.pagination.pageCount} onPage={setPage} />}
    </div>
  );
}
