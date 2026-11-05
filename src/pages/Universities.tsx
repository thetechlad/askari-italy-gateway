import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useUniversities,
  useMastersPrograms,
  useBachelorsPrograms,
} from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";
import { ScholarshipsBrowser } from "@/components/ScholarshipsBrowser";

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

function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-md rounded-xl border border-askari-navy/[0.14] bg-askari-white px-4 py-3 text-sm outline-none focus:border-askari-gold"
    />
  );
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

function UniversitiesTab() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebouncedValue(search, 300);
  const { data, isLoading } = useUniversities({ page, pageSize: PAGE_SIZE, search: debounced });

  return (
    <div>
      <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by university name…" />
      <div className="mt-6 overflow-x-auto rounded-2xl border border-askari-navy/10 bg-askari-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-askari-navy/10 text-xs uppercase tracking-wide text-askari-textBody2">
            <tr>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">English cert.</th>
              <th className="px-4 py-3">Admission date</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">CGPA</th>
              <th className="px-4 py-3">More info</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <SkeletonRows cols={7} />}
            {!isLoading && data?.data.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <EmptyState icon={SearchX} message="No universities match your search." />
                </td>
              </tr>
            )}
            {data?.data.map((u) => {
              const isRealUrl = /^https?:\/\//i.test(u.applicationLink || "");
              return (
              <tr key={u.id} className="border-b border-askari-navy/[0.06] last:border-0">
                <td className="px-4 py-3 font-medium">
                  {isRealUrl ? (
                    <a href={u.applicationLink} target="_blank" rel="noreferrer" className="hover:text-askari-goldMuted">
                      {u.name}
                    </a>
                  ) : (
                    u.name
                  )}
                </td>
                <td className="px-4 py-3">{u.admissionFee || "—"}</td>
                <td className="px-4 py-3">{u.englishCertificate || "—"}</td>
                <td className="px-4 py-3">{u.estimatedAdmissionDate || "—"}</td>
                <td className="px-4 py-3">{u.deadline || "—"}</td>
                <td className="px-4 py-3">
                  {!isRealUrl && u.applicationLink && (
                    <span className="rounded-full bg-askari-sand px-2.5 py-1 text-xs text-askari-textBody2">
                      {u.applicationLink}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">{u.cgpaRequirement || "—"}</td>
              </tr>
            );})}
          </tbody>
        </table>
      </div>
      {data && <Pager page={page} pageCount={data.meta.pagination.pageCount} onPage={setPage} />}
    </div>
  );
}

function ProgramsTab({ kind }: { kind: "masters" | "bachelors" }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebouncedValue(search, 300);
  const mastersQuery = useMastersPrograms({ page, pageSize: PAGE_SIZE, search: debounced });
  const bachelorsQuery = useBachelorsPrograms({ page, pageSize: PAGE_SIZE, search: debounced });
  const { data, isLoading } = kind === "masters" ? mastersQuery : bachelorsQuery;

  return (
    <div>
      <SearchInput
        value={search}
        onChange={(v) => { setSearch(v); setPage(1); }}
        placeholder="Search by course, field or university…"
      />
      <div className="mt-6 overflow-x-auto rounded-2xl border border-askari-navy/10 bg-askari-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-askari-navy/10 text-xs uppercase tracking-wide text-askari-textBody2">
            <tr>
              <th className="px-4 py-3">Programme</th>
              <th className="px-4 py-3">Field</th>
              <th className="px-4 py-3">University</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <SkeletonRows cols={3} />}
            {!isLoading && data?.data.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <EmptyState icon={SearchX} message="No programmes match your search." />
                </td>
              </tr>
            )}
            {data?.data.map((p) => (
              <tr key={p.id} className="border-b border-askari-navy/[0.06] last:border-0">
                <td className="px-4 py-3 font-medium">{p.program}</td>
                <td className="px-4 py-3 text-askari-textBody2">{p.field || "—"}</td>
                <td className="px-4 py-3">{p.universityName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && <Pager page={page} pageCount={data.meta.pagination.pageCount} onPage={setPage} />}
    </div>
  );
}

export default function Universities() {
  usePageMeta(
    "University & Programme Finder",
    "Search 67 Italian public universities and 450+ English-taught Bachelor's and Master's programmes, plus regional scholarship agencies.",
    { path: "/universities" }
  );
  return (
    <div>
      <section className="bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Directory</div>
          <h1 className="text-display-1 mt-4 max-w-[900px]">
            University &amp; programme finder
          </h1>
          <p className="mt-5 max-w-[620px] text-base leading-relaxed text-askari-cream/70">
            Search public Italian universities, English-taught Bachelor's and Master's programmes, and
            regional scholarship agencies — the same data we work from when we build your shortlist.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 md:px-10 md:py-16">
        <Tabs defaultValue="universities">
          <TabsList className="mb-2 flex h-auto flex-wrap gap-1 bg-askari-sand p-1">
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="masters">Masters Programs</TabsTrigger>
            <TabsTrigger value="bachelors">Bachelors Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Regional Scholarships</TabsTrigger>
          </TabsList>
          <TabsContent value="universities" className="mt-6">
            <UniversitiesTab />
          </TabsContent>
          <TabsContent value="masters" className="mt-6">
            <ProgramsTab kind="masters" />
          </TabsContent>
          <TabsContent value="bachelors" className="mt-6">
            <ProgramsTab kind="bachelors" />
          </TabsContent>
          <TabsContent value="scholarships" className="mt-6">
            <ScholarshipsBrowser />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
