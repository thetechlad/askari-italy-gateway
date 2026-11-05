const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
const TOKEN_KEY = "askari_portal_jwt";

export function getPortalToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setPortalToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearPortalToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function portalFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getPortalToken();
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401 || res.status === 403) {
    clearPortalToken();
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface PortalStudent {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string | null;
  stage: string;
  targetIntake: string | null;
  notes: string | null;
  level: "Bachelors" | "Masters" | null;
  cgpaPercentage: number | null;
  specializationKeywords: string | null;
  budgetAnnualEUR: number | null;
  verifiedAt: string | null;
  creditBalance: number;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  resumeDocument?: { url: string; name: string } | null;
}

export type ApplicationStatus = "Draft" | "InProgress" | "Submitted" | "OfferReceived" | "Rejected" | "Enrolled";

export const STUDENT_MOVABLE_STATUSES: ApplicationStatus[] = ["Draft", "InProgress", "Submitted"];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  Draft: "To Apply",
  InProgress: "Currently Applying",
  Submitted: "Applied",
  OfferReceived: "Offer received",
  Rejected: "Not successful",
  Enrolled: "Enrolled",
};

export interface PortalApplication {
  id: number;
  documentId: string;
  applicationStatus: ApplicationStatus;
  submittedAt: string | null;
  decisionAt: string | null;
  university?: { id: number; name: string } | null;
  mastersProgram?: { id: number; program: string } | null;
  bachelorsProgram?: { id: number; program: string } | null;
}

export interface PortalDocument {
  id: number;
  documentId: string;
  type: string;
  documentStatus: string;
  note: string | null;
  helpNote: string | null;
  file?: { url: string; name: string } | null;
}

export interface PortalProcessStep {
  id: number;
  documentId: string;
  title: string;
  order: number;
  stepStatus: "NotStarted" | "InProgress" | "Completed" | "Blocked";
  details: string | null;
  completedAt: string | null;
  attachment?: { url: string; name: string } | null;
}

export const STAGES = [
  "New",
  "Contacted",
  "ConsultationBooked",
  "DocumentsCollecting",
  "ApplicationSubmitted",
  "VisaFiled",
  "VisaApproved",
  "Enrolled",
] as const;

export const STAGE_LABELS: Record<string, string> = {
  New: "New inquiry",
  Contacted: "Contacted",
  ConsultationBooked: "Consultation booked",
  DocumentsCollecting: "Collecting documents",
  ApplicationSubmitted: "Application submitted",
  VisaFiled: "Visa filed",
  VisaApproved: "Visa approved",
  VisaRefused: "Visa refused",
  Enrolled: "Enrolled",
  Lost: "Closed",
};

export const DOCUMENT_TYPES = [
  "Passport",
  "HighSchoolCertificate",
  "DegreeTranscript",
  "CV",
  "MotivationLetter",
  "RecommendationLetter",
  "EnglishCertificate",
  "TOLCResult",
  "CIMEAStatement",
  "IncomeCertificate",
  "BankStatement",
  "NTNCertificate",
  "FinancialProof",
  "Photo",
  "Other",
];

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  Passport: "Passport",
  HighSchoolCertificate: "High school certificate",
  DegreeTranscript: "Degree / transcript",
  CV: "CV (Europass format)",
  MotivationLetter: "Motivation letter",
  RecommendationLetter: "Recommendation letter",
  EnglishCertificate: "English certificate (MOI / IELTS)",
  TOLCResult: "TOLC entrance test result",
  CIMEAStatement: "CIMEA statement",
  IncomeCertificate: "Income certificate",
  BankStatement: "Bank statement",
  NTNCertificate: "NTN certificate",
  FinancialProof: "Financial proof",
  Photo: "Passport-sized photo",
  Other: "Other",
};

export const STEP_STATUS_LABELS: Record<PortalProcessStep["stepStatus"], string> = {
  NotStarted: "Not started",
  InProgress: "In progress",
  Completed: "Completed",
  Blocked: "Blocked",
};

export interface ChecklistItem {
  id: number;
  documentId: string;
  code: string;
  label: string;
  required: boolean;
  status: "Required" | "Uploaded" | "Checked" | "NeedsReplacement" | "HumanReview";
  conditionalRouteSelected: string | null;
  reviewNote: string | null;
  checkedAt: string | null;
}

export const CHECKLIST_STATUS_LABELS: Record<ChecklistItem["status"], string> = {
  Required: "Not uploaded yet",
  Uploaded: "Uploaded — pending review",
  Checked: "Verified",
  NeedsReplacement: "Needs a new copy",
  HumanReview: "Help requested",
};

export interface MatchDisplayInfo {
  tuitionAnnual: number | null;
  applicationFeeEUR: number | null;
  studyMode: string | null;
  deadline: string | null;
  classesStart: string | null;
  durationMonths: number;
  languageRequirement: string | null;
  languageMinScore: number | null;
  minCGPAPercentage: number | null;
  cgpaRequirementUnresolved: boolean;
  tuitionNote: string | null;
}

export interface MatchResult {
  programId: number;
  programType: "masters-program" | "bachelors-program";
  universityId: number | null;
  universityName: string;
  program: string;
  verdict: "Meets published criteria" | "Needs verification" | "Does not meet published criteria";
  reasons: string[];
  withinBudget: boolean | null;
  scoreBreakdown: {
    subjectCareer: number;
    affordability: number;
    timingReadiness: number;
    locationFormat: number;
    total: number;
  } | null;
  rank: number | null;
  recommendedAreaOfStudy: string | null;
  whyThisMatch: string;
  recommendedActions: string[];
  display: MatchDisplayInfo;
}

export interface MatchRunResponse {
  matchRunId: number;
  charged: boolean;
  creditBalance: number;
  results: {
    meets: MatchResult[];
    needsVerification: MatchResult[];
    doesNotMeet: MatchResult[];
  };
}

export interface PortalMatchRun {
  id: number;
  documentId: string;
  status: "Pending" | "Completed" | "Failed";
  failureReason: string | null;
  requestedAt: string | null;
  completedAt: string | null;
  results: MatchRunResponse["results"] | null;
}

export async function portalLogin(identifier: string, password: string) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body?.error?.message || "Invalid email or password.");
  }
  setPortalToken(body.jwt);
  return body;
}

export async function getMyStudent(): Promise<PortalStudent | null> {
  const res = await portalFetch<{ data: PortalStudent[] }>("/api/students");
  return res.data[0] ?? null;
}

export async function getMyApplications(): Promise<PortalApplication[]> {
  const res = await portalFetch<{ data: PortalApplication[] }>(
    "/api/applications?populate=university,mastersProgram,bachelorsProgram"
  );
  return res.data;
}

export async function createApplication(params: {
  universityId: number;
  mastersProgramId?: number;
  bachelorsProgramId?: number;
}): Promise<PortalApplication> {
  const res = await portalFetch<{ data: PortalApplication }>("/api/applications/mine", {
    method: "POST",
    body: JSON.stringify(params),
  });
  return res.data;
}

export async function moveApplication(id: number, applicationStatus: ApplicationStatus): Promise<PortalApplication> {
  const res = await portalFetch<{ data: PortalApplication }>(`/api/applications/${id}/move`, {
    method: "PUT",
    body: JSON.stringify({ applicationStatus }),
  });
  return res.data;
}

export async function getMyDocuments(): Promise<PortalDocument[]> {
  const res = await portalFetch<{ data: PortalDocument[] }>("/api/documents?populate=file");
  return res.data;
}

export async function getMyProcessSteps(): Promise<PortalProcessStep[]> {
  const res = await portalFetch<{ data: PortalProcessStep[] }>(
    "/api/process-steps?populate=attachment&sort=order:asc"
  );
  return res.data;
}

export async function uploadDocument(file: File, type: string): Promise<void> {
  const form = new FormData();
  form.append("files", file);
  const uploadRes = await portalFetch<{ id: number }[]>("/api/upload", {
    method: "POST",
    body: form,
  });
  const fileId = uploadRes[0].id;
  await portalFetch("/api/documents", {
    method: "POST",
    body: JSON.stringify({ data: { type, file: fileId } }),
  });
}

export async function requestDocumentHelp(type: string, note: string): Promise<void> {
  await portalFetch("/api/documents", {
    method: "POST",
    body: JSON.stringify({ data: { type, documentStatus: "HelpRequested", helpNote: note } }),
  });
}

export function fileUrl(path: string): string {
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}

export async function getMyChecklistItems(): Promise<ChecklistItem[]> {
  const res = await portalFetch<{ data: ChecklistItem[] }>("/api/checklist-items");
  return res.data;
}

export async function replaceChecklistItem(itemId: number, file: File): Promise<void> {
  const form = new FormData();
  form.append("files", file);
  const uploadRes = await portalFetch<{ id: number }[]>("/api/upload", {
    method: "POST",
    body: form,
  });
  const fileId = uploadRes[0].id;
  await portalFetch(`/api/checklist-items/${itemId}/replace`, {
    method: "PUT",
    body: JSON.stringify({ fileId }),
  });
}

export async function requestChecklistHelp(itemId: number, note: string): Promise<void> {
  await portalFetch(`/api/checklist-items/${itemId}/request-help`, {
    method: "POST",
    body: JSON.stringify({ note }),
  });
}

export interface ProfileUpdate {
  level?: "Bachelors" | "Masters";
  cgpaPercentage?: number;
  specializationKeywords?: string;
  budgetAnnualEUR?: number;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export async function updateMyProfile(update: ProfileUpdate): Promise<PortalStudent> {
  const res = await portalFetch<{ data: PortalStudent }>("/api/students/me/profile", {
    method: "PUT",
    body: JSON.stringify(update),
  });
  return res.data;
}

export async function uploadResume(file: File): Promise<PortalStudent> {
  const form = new FormData();
  form.append("files", file);
  const uploadRes = await portalFetch<{ id: number }[]>("/api/upload", {
    method: "POST",
    body: form,
  });
  const fileId = uploadRes[0].id;
  const res = await portalFetch<{ data: PortalStudent }>("/api/students/me/profile", {
    method: "PUT",
    body: JSON.stringify({ resumeDocumentId: fileId }),
  });
  return res.data;
}

export async function runMatch(): Promise<MatchRunResponse> {
  // Not using portalFetch here: the backend returns distinct 409/402 status
  // codes with a flat {error: "..."} body for the two expected failure
  // modes (readiness gate closed / out of credits), which portalFetch's
  // generic non-ok handling would collapse into one undifferentiated
  // "Request failed" message — the specific reason matters for the UI.
  const token = getPortalToken();
  const res = await fetch(`${STRAPI_URL}/api/match-runs/run`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (res.status === 401 || res.status === 403) {
    clearPortalToken();
    throw new Error("Session expired. Please log in again.");
  }
  const body = await res.json();
  if (res.status === 409) throw new Error("Finish your checklist before running a match.");
  if (res.status === 402) throw new Error("You're out of matching credits.");
  if (!res.ok) throw new Error(body?.error?.message || "Could not run a match — please try again.");
  return body.data;
}

export async function getMyMatchRuns(): Promise<PortalMatchRun[]> {
  const res = await portalFetch<{ data: PortalMatchRun[] }>("/api/match-runs?sort=createdAt:desc");
  return res.data;
}
