import { useMemo, useState } from "react";
import { useGlossaryTerms } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { EmptyState } from "@/components/EmptyState";
import { SearchX } from "lucide-react";

export default function Glossary() {
  const { data: terms } = useGlossaryTerms();
  usePageMeta(
    "Glossary",
    "Every Italy study-visa and admissions term explained in plain English: CIMEA, ISEE Parificato, permesso di soggiorno, TOLC, IMAT and more.",
    {
      path: "/glossary",
      jsonLd:
        terms && terms.length > 0
          ? {
              "@context": "https://schema.org",
              "@type": "DefinedTermSet",
              name: "Askari Consultants — Italy Study Visa Glossary",
              hasDefinedTerm: terms.map((t) => ({
                "@type": "DefinedTerm",
                name: t.term,
                description: t.definition,
              })),
            }
          : undefined,
    }
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set((terms ?? []).map((t) => t.category))),
    [terms]
  );

  const filtered = useMemo(() => {
    return (terms ?? []).filter((t) => {
      const matchesSearch =
        !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [terms, search, activeCategory]);

  return (
    <div>
      <section className="bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Glossary</div>
          <h1 className="text-display-1 mt-4 max-w-[900px]">
            Every term you'll hit, explained once.
          </h1>
          <p className="mt-5 max-w-[620px] text-base leading-relaxed text-askari-cream/70">
            CIMEA, ISEE Parificato, permesso di soggiorno, TOLC — the vocabulary of an Italian
            application, in plain English, in one place.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 md:px-10 md:py-16">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a term…"
          className="w-full rounded-xl border border-askari-navy/[0.14] bg-askari-white px-4 py-3.5 text-sm outline-none focus:border-askari-gold"
        />
        <div className="mt-4 flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
              activeCategory === null
                ? "border-askari-navy bg-askari-navy text-askari-cream"
                : "border-askari-navy/10 hover:bg-askari-sand"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                activeCategory === cat
                  ? "border-askari-navy bg-askari-navy text-askari-cream"
                  : "border-askari-navy/10 hover:bg-askari-sand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 divide-y divide-askari-navy/[0.1]">
          {filtered.map((t) => (
            <div key={t.slug} id={t.slug} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl">{t.term}</h3>
                <span className="text-[10px] uppercase tracking-[0.16em] text-askari-goldMuted">
                  {t.category}
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-askari-textBody">{t.definition}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <EmptyState
              icon={SearchX}
              message="No terms match your search."
              action={{ label: "Clear filters", onClick: () => { setSearch(""); setActiveCategory(null); } }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
