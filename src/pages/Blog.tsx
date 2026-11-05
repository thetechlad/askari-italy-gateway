import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import studentOutdoorsImg from "@/assets/design/student-outdoors.jpg";
import { useBlogPosts } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { useRevealBatch } from "@/hooks/useRevealBatch";
import { EmptyState } from "@/components/EmptyState";
import { Inbox } from "lucide-react";

export default function Blog() {
  usePageMeta(
    "Journal",
    "Deadlines, documents and what actually goes wrong when applying to Italian universities from Pakistan — practical guides from Askari Consultants.",
    { path: "/blog" }
  );
  const { data: posts } = useBlogPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const allPosts = posts ?? [];
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));
  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;
  const [featured, ...rest] = filteredPosts;
  const gridRef = useRef<HTMLDivElement>(null);
  useRevealBatch(gridRef, ".reveal-item", [rest.length]);

  return (
    <div>
      <section className="bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Journal</div>
          <h1 className="text-display-1 mt-4">
            Deadlines, documents and what actually goes wrong.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 md:px-10 md:py-20">
        <div className="mb-10 flex flex-wrap gap-1.5">
          <button
            onClick={() => setSearchParams({})}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
              !activeCategory
                ? "border-askari-navy bg-askari-navy text-askari-cream"
                : "border-askari-navy/10 hover:bg-askari-sand"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams({ category: cat })}
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

        {featured && (
          <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="grid grid-cols-1 items-center gap-6 border-b border-askari-navy/[0.12] pb-10 sm:grid-cols-2 sm:gap-10 md:pb-14"
          >
            <img
              src={studentOutdoorsImg}
              alt="Student working outdoors on campus"
              className="h-[240px] w-full rounded-[22px] object-cover sm:h-[320px] md:h-[400px]"
            />
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">
                {featured.category} · {featured.date}
              </div>
              <h2 className="mt-4 font-display text-[30px] leading-[1.08] sm:text-[38px] lg:text-[48px]">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-askari-textBody">{featured.excerpt}</p>
              <span className="mt-5 inline-block border-b border-askari-gold pb-0.5 text-[13px] font-semibold">
                Read article →
              </span>
            </div>
          </Link>
          </Reveal>
        )}

        <div ref={gridRef} className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:pt-14 lg:grid-cols-3 lg:gap-9">
          {rest.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="reveal-item block">
              <div className="text-[11px] uppercase tracking-[0.18em] text-askari-goldMuted">
                {p.category} · {p.date}
              </div>
              <h3 className="mt-3 font-display text-2xl leading-tight">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-askari-textBody2">{p.excerpt}</p>
              <div className="mt-3.5 text-[12.5px] text-askari-goldMuted">{p.readTime}</div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <EmptyState
            icon={Inbox}
            message="No articles in this category yet."
            action={{ label: "Show all articles", onClick: () => setSearchParams({}) }}
          />
        )}
      </section>
    </div>
  );
}
