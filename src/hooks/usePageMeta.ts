import { useEffect } from "react";

const SITE_NAME = "Askari Consultants";
const SITE_URL = "https://askariconsultants.pk";
const DEFAULT_DESCRIPTION =
  "Italy admissions, visas and legal documentation for Pakistani students. University shortlisting, visa filing, FBR/NTN, SOPs, translation and attestation, handled end to end.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.png`;

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", `${SITE_URL}${path}`);
}

function setJsonLd(schema: object | object[] | undefined) {
  const existing = document.querySelectorAll('script[data-page-jsonld="true"]');
  existing.forEach((el) => el.remove());
  if (!schema) return;
  const items = Array.isArray(schema) ? schema : [schema];
  for (const item of items) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageJsonld = "true";
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  }
}

/**
 * Sets per-page <title>, meta description, canonical URL, Open Graph/Twitter
 * tags, and optional JSON-LD structured data. Open Graph tags only help
 * crawlers that execute JS (Google/Bing) — this is a client-rendered SPA
 * with no SSR/prerendering, so a social unfurl (Facebook/Twitter/WhatsApp
 * link preview bot) will only ever see index.html's static defaults, never
 * these per-page values. That's a real limitation of the current
 * architecture, not something this hook can work around.
 */
export function usePageMeta(
  title: string,
  description: string = DEFAULT_DESCRIPTION,
  options?: { path?: string; image?: string; jsonLd?: object | object[] }
) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    if (options?.image) {
      setMetaTag("property", "og:image", options.image);
      setMetaTag("name", "twitter:image", options.image);
    } else {
      setMetaTag("property", "og:image", DEFAULT_OG_IMAGE);
      setMetaTag("name", "twitter:image", DEFAULT_OG_IMAGE);
    }
    if (options?.path) {
      setCanonical(options.path);
      setMetaTag("property", "og:url", `${SITE_URL}${options.path}`);
    }
    setJsonLd(options?.jsonLd);

    return () => setJsonLd(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, options?.path, options?.image, JSON.stringify(options?.jsonLd ?? null)]);
}
