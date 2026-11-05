import { Link, useParams, Navigate } from "react-router-dom";
import { useServiceBySlug } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { WHATSAPP_ITALY } from "@/lib/contact";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = useServiceBySlug(slug);
  usePageMeta(service?.name ?? "Service", service?.long, {
    path: `/services/${slug}`,
    jsonLd: service
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.short ?? service.long,
          provider: { "@type": "EducationalOrganization", name: "Askari Consultants" },
          areaServed: "PK",
        }
      : undefined,
  });

  if (!isLoading && !service) {
    return <Navigate to="/services" replace />;
  }

  if (isLoading) {
    return (
      <div>
        <section className="bg-askari-navy px-4 pb-12 pt-10 sm:px-6 md:px-10 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-[1280px] space-y-3.5">
            <Skeleton className="h-3 w-24 bg-white/10" />
            <Skeleton className="h-12 w-full max-w-[700px] bg-white/10" />
            <Skeleton className="h-4 w-full max-w-[500px] bg-white/10" />
          </div>
        </section>
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 md:px-10 md:py-20 lg:grid-cols-[1.5fr_.9fr]">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-[1280px]">
          <Link to="/services" className="text-xs uppercase tracking-[0.14em] text-askari-cream/60">
            ← All services
          </Link>
          {service && (
            <>
              <h1 className="text-display-1 mt-5 max-w-[880px]">
                {service.name}
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-askari-cream/70 sm:text-lg">
                {service.long}
              </p>
            </>
          )}
        </div>
      </section>

      {service && (
        <section className="mx-auto grid max-w-[1280px] items-start gap-10 px-4 py-12 sm:px-6 md:px-10 md:py-20 lg:grid-cols-[1.5fr_.9fr]">
          <div>
            <div className="mb-5.5 text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">
              What's included
            </div>
            {service.includes.map((item) => (
              <div key={item} className="flex gap-4 border-b border-askari-navy/10 py-4.5">
                <span className="text-sm text-askari-green">●</span>
                <div className="text-[15.5px] leading-relaxed">{item}</div>
              </div>
            ))}
            <div className="mb-4.5 mt-11 text-[11px] uppercase tracking-[0.2em] text-askari-goldMuted">
              How it runs
            </div>
            <p className="text-[15.5px] leading-loose text-askari-textBody3">{service.detail}</p>
          </div>
          <div className="sticky top-[110px] rounded-2xl bg-askari-navy p-7 text-askari-cream">
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Indicative fee</div>
            <div className="mt-2.5 font-display text-[40px]">{service.fee}</div>
            <p className="mb-5.5 mt-3 text-[13px] leading-relaxed text-askari-cream/60">
              Included free inside the Professional and Elite packages. Ask for an exact quote with your
              documents.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_ITALY}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full"
            >
              Ask about this on WhatsApp
            </a>
            <Link
              to="/pricing"
              className="btn-outline-light mt-2.5 w-full"
            >
              See full packages
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
