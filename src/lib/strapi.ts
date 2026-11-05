const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

interface StrapiListResponse<T> {
  data: (T & { id: number })[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface StrapiSingleResponse<T> {
  data: (T & { id: number }) | null;
}

async function fetchStrapi<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`);
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText} (${path})`);
  }
  return res.json();
}

export interface Service {
  num: string;
  name: string;
  slug: string;
  short: string;
  long: string;
  fee: string;
  includes: string[];
  detail: string;
  order: number;
}

export interface PricingPackage {
  tier: string;
  badge: string;
  name: string;
  price: string;
  who: string;
  items: string[];
  order: number;
}

export interface AlaCarteItem {
  name: string;
  price: string;
  order: number;
}

export interface Testimonial {
  tag: string;
  quote: string;
  name: string;
  where: string;
  featured: boolean;
  order: number;
}

export interface Faq {
  question: string;
  answer: string;
  order: number;
}

export interface BlogPostBodyBlock {
  h?: string;
  p?: string;
  items?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface BlogPost {
  category: string;
  date: string;
  readTime: string;
  title: string;
  slug: string;
  excerpt: string;
  body: BlogPostBodyBlock[];
  order: number;
}

export interface University {
  number: number;
  name: string;
  applicationLink: string;
  blogLink: string;
  admissionFee: string;
  englishCertificate: string;
  estimatedAdmissionDate: string;
  deadline: string;
  status: string;
  cgpaRequirement: string;
}

export interface MastersProgram {
  number: number;
  program: string;
  field: string;
  universityName: string;
}

export interface BachelorsProgram {
  number: number;
  program: string;
  field: string;
  universityName: string;
}

export interface RegionalScholarship {
  number: number;
  universityName: string;
  regionalAgency: string;
  documentRequirements: string;
  openingDate: string;
  status: string;
  deadline: string;
}

export interface ChecklistEntry {
  item: string;
  note: string;
}

export interface SiteSetting {
  heroStats: { n: string; l: string }[];
  processSteps: { when: string; title: string; body: string }[];
  reasons: { n: string; t: string; b: string }[];
  cities: { city: string; unis: string; cost: string; tag: string }[];
  aboutFacts: { label: string; value: string }[];
  principles: { title: string; body: string }[];
  contactFacts: { label: string; value: string }[];
  whatsappItaly: string;
  whatsappPakistan: string;
  email: string;
  offices: string;
  facebook: string;
  instagram: string;
  aboutByTheNumbers?: { label: string; value: string }[];
  documentChecklist?: { bachelors: ChecklistEntry[]; masters: ChecklistEntry[] };
  applicationDeadline?: string;
}

export interface VisaApproval {
  studentName: string;
  university?: string;
  programme?: string;
  visaDate?: string;
  photo?: { url: string; name: string } | null;
  featured: boolean;
  order: number;
}

export function mediaUrl(path: string): string {
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  slug: string;
  order: number;
}

export interface LeadSubmission {
  name: string;
  email: string;
  whatsapp?: string;
  intake?: string;
  intendedDegree?: "Bachelors" | "Masters";
  message?: string;
  source: string;
}

const sortByOrder = <T extends { order?: number }>(items: T[]) =>
  [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export async function getServices() {
  const res = await fetchStrapi<StrapiListResponse<Service>>("/services?pagination[pageSize]=100");
  return sortByOrder(res.data);
}

export async function getServiceBySlug(slug: string) {
  const res = await fetchStrapi<StrapiListResponse<Service>>(
    `/services?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  return res.data[0] ?? null;
}

export async function getPricingPackages() {
  const res = await fetchStrapi<StrapiListResponse<PricingPackage>>("/pricing-packages?pagination[pageSize]=50");
  return sortByOrder(res.data);
}

export async function getAlaCarteItems() {
  const res = await fetchStrapi<StrapiListResponse<AlaCarteItem>>("/ala-carte-items?pagination[pageSize]=50");
  return sortByOrder(res.data);
}

export async function getTestimonials() {
  const res = await fetchStrapi<StrapiListResponse<Testimonial>>("/testimonials?pagination[pageSize]=100");
  return sortByOrder(res.data);
}

export async function getVisaApprovals() {
  const res = await fetchStrapi<StrapiListResponse<VisaApproval>>(
    "/visa-approvals?populate=photo&pagination[pageSize]=100&sort=order:asc"
  );
  return sortByOrder(res.data);
}

export async function getFaqs() {
  const res = await fetchStrapi<StrapiListResponse<Faq>>("/faqs?pagination[pageSize]=50");
  return sortByOrder(res.data);
}

export async function getBlogPosts() {
  const res = await fetchStrapi<StrapiListResponse<BlogPost>>("/blog-posts?pagination[pageSize]=100");
  return sortByOrder(res.data);
}

export async function getBlogPostBySlug(slug: string) {
  const res = await fetchStrapi<StrapiListResponse<BlogPost>>(
    `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  return res.data[0] ?? null;
}

export async function getSiteSetting() {
  const res = await fetchStrapi<StrapiSingleResponse<SiteSetting>>("/site-setting");
  return res.data;
}

export interface PagedParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getUniversities({ page = 1, pageSize = 20, search = "" }: PagedParams = {}) {
  const searchFilter = search
    ? `&filters[name][$containsi]=${encodeURIComponent(search)}`
    : "";
  return fetchStrapi<StrapiListResponse<University>>(
    `/universities?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=number:asc${searchFilter}`
  );
}

export async function getMastersPrograms({ page = 1, pageSize = 20, search = "" }: PagedParams = {}) {
  const searchFilter = search
    ? `&filters[$or][0][program][$containsi]=${encodeURIComponent(search)}&filters[$or][1][field][$containsi]=${encodeURIComponent(search)}&filters[$or][2][universityName][$containsi]=${encodeURIComponent(search)}`
    : "";
  return fetchStrapi<StrapiListResponse<MastersProgram>>(
    `/masters-programs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=number:asc${searchFilter}`
  );
}

export async function getBachelorsPrograms({ page = 1, pageSize = 20, search = "" }: PagedParams = {}) {
  const searchFilter = search
    ? `&filters[$or][0][program][$containsi]=${encodeURIComponent(search)}&filters[$or][1][field][$containsi]=${encodeURIComponent(search)}&filters[$or][2][universityName][$containsi]=${encodeURIComponent(search)}`
    : "";
  return fetchStrapi<StrapiListResponse<BachelorsProgram>>(
    `/bachelors-programs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=number:asc${searchFilter}`
  );
}

export async function getRegionalScholarships({ page = 1, pageSize = 20, search = "" }: PagedParams = {}) {
  const searchFilter = search
    ? `&filters[universityName][$containsi]=${encodeURIComponent(search)}`
    : "";
  return fetchStrapi<StrapiListResponse<RegionalScholarship>>(
    `/regional-scholarships?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=number:asc${searchFilter}`
  );
}

export async function getGlossaryTerms() {
  const res = await fetchStrapi<StrapiListResponse<GlossaryTerm>>("/glossary-terms?pagination[pageSize]=200");
  return sortByOrder(res.data);
}

export async function submitLead(lead: LeadSubmission): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: lead }),
  });
  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status} ${res.statusText}`);
  }
}

/** Submits the verified-lead capture form and triggers a verification code (delivery is a backend follow-up — see askari-cms config/plugins.ts). */
export async function submitLeadAndRequestCode(lead: LeadSubmission): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: lead }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || "Could not start verification — please try again.");
  }
}

export interface VerifyLeadResult {
  jwt: string;
  creditBalance: number;
}

export async function verifyLeadCode(email: string, code: string): Promise<VerifyLeadResult> {
  const res = await fetch(`${STRAPI_URL}/api/leads/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body?.error?.message || "Incorrect or expired code.");
  }
  return body;
}
