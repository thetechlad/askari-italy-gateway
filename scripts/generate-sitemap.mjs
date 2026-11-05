#!/usr/bin/env node
// Regenerates public/sitemap.xml from live Strapi content (service and blog
// post slugs) plus the fixed static routes. Run after publishing new
// services or blog posts: `node scripts/generate-sitemap.mjs`.
// Reads STRAPI_URL from the environment, defaulting to the local dev server.

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1338";
const SITE_URL = "https://askariconsultants.pk";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/pricing", priority: "0.9" },
  { path: "/approvals", priority: "0.8" },
  { path: "/guide", priority: "0.5" },
  { path: "/universities", priority: "0.9" },
  { path: "/glossary", priority: "0.8" },
  { path: "/checklist", priority: "0.8" },
  { path: "/stories", priority: "0.7" },
  { path: "/blog", priority: "0.7" },
  { path: "/about", priority: "0.6" },
  { path: "/contact", priority: "0.6" },
];

async function fetchAll(endpoint) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=200`);
  if (!res.ok) throw new Error(`${endpoint} fetch failed: ${res.status}`);
  const json = await res.json();
  return json.data ?? [];
}

const services = await fetchAll("services");
const posts = await fetchAll("blog-posts");

const dynamicRoutes = [
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: "0.7" })),
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: "0.6" })),
];

const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><priority>${r.priority}</priority></url>`).join("\n")}
</urlset>
`;

const fs = await import("node:fs/promises");
await fs.writeFile(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml written with ${allRoutes.length} URLs (${services.length} services, ${posts.length} blog posts).`);
