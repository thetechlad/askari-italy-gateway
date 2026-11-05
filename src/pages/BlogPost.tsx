import { Link, useParams, Navigate } from "react-router-dom";
import { useBlogPostBySlug } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { WHATSAPP_ITALY } from "@/lib/contact";
import { Reveal } from "@/components/Reveal";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPostBySlug(slug);
  usePageMeta(post?.title ?? "Journal", post?.excerpt, {
    path: `/blog/${slug}`,
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          articleSection: post.category,
          publisher: { "@type": "EducationalOrganization", name: "Askari Consultants" },
        }
      : undefined,
  });

  if (!isLoading && !post) {
    return <Navigate to="/blog" replace />;
  }

  if (isLoading) {
    return (
      <div>
        <section className="bg-askari-navy px-4 pb-11 pt-10 sm:px-6 md:px-10 md:pb-[70px] md:pt-16">
          <div className="mx-auto max-w-[780px] space-y-3.5">
            <Skeleton className="h-3 w-20 bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
            <Skeleton className="h-10 w-2/3 bg-white/10" />
          </div>
        </section>
        <div className="mx-auto max-w-[780px] space-y-3 px-4 py-10 sm:px-6 md:px-10 md:py-[70px]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-askari-navy px-4 pb-11 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-[70px] md:pt-16">
        <Reveal className="mx-auto max-w-[780px]">
          <Link to="/blog" className="text-xs uppercase tracking-[0.14em] text-askari-cream/60">
            ← Journal
          </Link>
          {post && (
            <>
              <div className="mt-6.5 text-[11px] uppercase tracking-[0.18em] text-askari-gold">
                {post.category} · {post.date} · {post.readTime}
              </div>
              <h1 className="mt-4 font-display text-[34px] leading-[1.06] sm:text-[48px] lg:text-[62px]">
                {post.title}
              </h1>
            </>
          )}
        </Reveal>
      </section>

      {post && (
        <article className="mx-auto max-w-[780px] px-4 py-10 sm:px-6 md:px-10 md:py-[70px]">
          <p className="mb-8 font-display text-xl leading-snug text-askari-textBody3 sm:text-[27px]">
            {post.excerpt}
          </p>
          {post.body.map((block, i) => (
            <div key={i} className="mb-6.5">
              {block.h && (
                <h2 className="mb-3.5 mt-10 font-display text-[26px] leading-tight sm:text-[30px]">
                  {block.h}
                </h2>
              )}
              {block.p && (
                <p className="text-base leading-loose text-askari-textBody3 sm:text-[16.5px]">{block.p}</p>
              )}
              {block.items && (
                <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-askari-textBody3 sm:text-[16.5px]">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
              {block.table && (
                <div className="overflow-x-auto rounded-xl border border-askari-navy/10">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-askari-navy text-askari-cream">
                        {block.table.headers.map((h, j) => (
                          <th key={j} className="px-4 py-3 text-left font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.table.rows.map((row, j) => (
                        <tr key={j} className={j % 2 ? "bg-askari-sandLight" : "bg-askari-white"}>
                          {row.map((cell, k) => (
                            <td key={k} className="px-4 py-3 align-top text-askari-textBody3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          <Reveal className="mt-12 rounded-2xl bg-askari-navy p-8 text-askari-cream">
            <div className="text-display-3">
              Not sure how this applies to your case?
            </div>
            <p className="mb-5.5 mt-3 text-sm leading-relaxed text-askari-cream/66">
              Send your degree, marks and target intake. We will answer with what is realistic.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Ask on WhatsApp
            </a>
          </Reveal>
        </article>
      )}
    </div>
  );
}
