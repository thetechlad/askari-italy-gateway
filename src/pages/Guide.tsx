import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_PAKISTAN } from "@/lib/contact";

import imgAdminLogin from "@/assets/guide/01-admin-login.jpg";
import imgAdminDashboard from "@/assets/guide/02-admin-dashboard.jpg";
import imgAdminRoles from "@/assets/guide/03-admin-roles.png";
import imgStudentsList from "@/assets/guide/04-students-list.jpg";
import imgStudentEdit from "@/assets/guide/05-student-edit.jpg";
import imgProcessSteps from "@/assets/guide/06-process-steps.jpg";
import imgDocumentsList from "@/assets/guide/07-documents-list.jpg";
import imgLeadConvert from "@/assets/guide/08-lead-convert.jpg";
import imgVisaApprovalsList from "@/assets/guide/09-visa-approvals-list.jpg";
import imgTasksList from "@/assets/guide/10-tasks-list.jpg";
import imgBlogPostsList from "@/assets/guide/11-blog-posts-list.jpg";
import imgPortalLogin from "@/assets/guide/12-portal-login.jpg";
import imgPortalDashboard from "@/assets/guide/13-portal-dashboard.jpg";
import imgPortalProcess from "@/assets/guide/14-portal-process.jpg";
import imgPortalDocuments from "@/assets/guide/15-portal-documents.jpg";

type Audience = "owners" | "advisors" | "social" | "students";

const AUDIENCES: { key: Audience; label: string; blurb: string }[] = [
  { key: "owners", label: "Owners", blurb: "Full access — the business side" },
  { key: "advisors", label: "Advisors", blurb: "Your assigned students, start to finish" },
  { key: "social", label: "Social Team", blurb: "Blog, testimonials, visa approvals wall" },
  { key: "students", label: "Students", blurb: "Track your own file" },
];

function Step({
  n,
  title,
  body,
  img,
  alt,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
  img?: string;
  alt?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 py-10 first:pt-0 md:grid-cols-[2fr_3fr] md:gap-10">
      <div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-askari-gold font-display text-sm font-bold text-askari-navy">
          {n}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">{title}</h3>
        <div className="mt-2.5 text-[14.5px] leading-relaxed text-askari-textBody">{body}</div>
      </div>
      {img && (
        <div className="overflow-hidden rounded-2xl border border-askari-navy/10 shadow-[0_18px_40px_rgba(11,23,54,0.14)]">
          <img src={img} alt={alt ?? title} className="w-full" loading="lazy" />
        </div>
      )}
    </div>
  );
}

export default function Guide() {
  usePageMeta(
    "Platform Guide",
    "A complete, screenshot-by-screenshot walkthrough of the Askari Consultants platform for owners, advisors, the social team and students.",
    { path: "/guide" }
  );
  const [active, setActive] = useState<Audience>("owners");

  return (
    <div>
      <section className="dotted-bg relative bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <Reveal className="relative mx-auto max-w-[1280px]">
          <div className="inline-flex items-center rounded-full bg-askari-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-askari-navy">
            Platform Guide
          </div>
          <h1 className="mt-5 max-w-[800px] font-display text-[36px] leading-[1.05] sm:text-[56px] lg:text-[64px]">
            How to use everything, step by step.
          </h1>
          <p className="mt-5 max-w-[600px] text-base leading-relaxed text-askari-cream/70">
            Every screen below is a real screenshot of the live platform — the website, the
            student portal and the staff admin panel — organised by who you are and what you
            need to do.
          </p>
        </Reveal>
      </section>

      {/* AUDIENCE SWITCHER */}
      <section className="sticky top-0 z-20 border-b border-askari-navy/[0.08] bg-askari-cream/95 px-4 py-4 backdrop-blur-sm sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap gap-2.5">
          {AUDIENCES.map((a) => (
            <button
              key={a.key}
              onClick={() => setActive(a.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active === a.key
                  ? "btn-glow-gold bg-askari-gold text-askari-navy"
                  : "bg-askari-sand text-askari-textBody hover:bg-askari-sandLight"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </section>

      {/* OWNERS */}
      {active === "owners" && (
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:px-10">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldDark">For owners</div>
            <h2 className="mt-2 font-display text-[30px] leading-tight sm:text-[40px]">
              You can see and do everything.
            </h2>
            <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-askari-textBody">
              As the owner you log in with the Super Admin account — the only login that sees
              both the full student pipeline and the website's content, with no restrictions.
            </p>

            <div className="mt-4 divide-y divide-askari-navy/[0.08]">
              <Step
                n={1}
                title="Log in to the admin panel"
                body={
                  <>
                    Go to <code className="rounded bg-askari-sand px-1.5 py-0.5 text-[13px]">yoursite.com/admin</code> and sign in
                    with your Super Admin email and password. This is a completely separate
                    login from the student portal.
                  </>
                }
                img={imgAdminLogin}
                alt="Strapi admin login screen"
              />
              <Step
                n={2}
                title="Your dashboard"
                body="A quick snapshot on login — recently edited and recently published content across the whole site."
                img={imgAdminDashboard}
                alt="Admin dashboard homepage"
              />
              <Step
                n={3}
                title="The three roles"
                body={
                  <>
                    Under <strong>Settings → Roles</strong> you'll find exactly three admin roles:
                    <strong> Super Admin</strong> (you — full access), <strong>Advisor</strong>{" "}
                    (sees only their assigned students, plus the CRM), and{" "}
                    <strong>Social Team</strong> (blog, testimonials, glossary, social posts, visa
                    approvals — no student data at all). This 3-role limit is a constraint of the
                    free tier of the software this runs on, not something either of us configured.
                  </>
                }
                img={imgAdminRoles}
                alt="Settings roles list showing Advisor, Social Team, Super Admin"
              />
              <Step
                n={4}
                title="Create staff accounts"
                body="Settings → Administration Panel → Users → Invite new user. Assign them the Advisor or Social Team role and they'll get a registration link."
              />
              <Step
                n={5}
                title="Everything an Advisor or Social Team member can do, you can do too"
                body="Every section in the Advisors and Social Team tabs above applies to you as well — plus the content neither of them can touch: Services, Pricing, FAQs, the university directory and Site Settings."
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* ADVISORS */}
      {active === "advisors" && (
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:px-10">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldDark">For advisors</div>
            <h2 className="mt-2 font-display text-[30px] leading-tight sm:text-[40px]">
              Your students, start to finish.
            </h2>
            <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-askari-textBody">
              You log into the same admin panel as the owner, but your view is automatically
              filtered to students assigned to you — set by matching your login email against
              each student's "assigned advisor" field.
            </p>

            <div className="mt-4 divide-y divide-askari-navy/[0.08]">
              <Step
                n={1}
                title="Your students list"
                body="Content Manager → Students shows only students assigned to you — name, stage, target intake."
                img={imgStudentsList}
                alt="Students list in the content manager"
              />
              <Step
                n={2}
                title="Open a student's record"
                body="Click into a student to see and edit their contact details, pipeline stage, assigned advisor and linked applications, documents, tasks and process steps."
                img={imgStudentEdit}
                alt="Student detail edit view"
              />
              <Step
                n={3}
                title="Keep their process steps current"
                body="Content Manager → Process Step. This is the detailed 8-step journey the student sees on their own portal — set each step's status and write what's actually happening. Completing a milestone step (documents, application, visa filing, approval) automatically advances the student's overall pipeline stage too, so you don't have to update both places by hand."
                img={imgProcessSteps}
                alt="Process steps list"
              />
              <Step
                n={4}
                title="Review uploaded documents"
                body="Content Manager → Document. Every file a student uploads shows up here immediately. If a student doesn't have something yet, they can flag 'help requested' instead of uploading — which automatically creates a task for you, so it doesn't just sit unnoticed."
                img={imgDocumentsList}
                alt="Documents list"
              />
              <Step
                n={5}
                title="Convert a lead into a student"
                body="Content Manager → Lead. Open an inbound inquiry from the website's contact form, tick 'Convert to Student' and save — it auto-creates the full student record (name, email, WhatsApp, intake) and marks the lead handled. One checkbox instead of re-typing everything into a second form."
                img={imgLeadConvert}
                alt="Lead record with the convertToStudent toggle"
              />
              <Step
                n={6}
                title="Your task list"
                body="Content Manager → Task — your to-do list, including tasks you create yourself and ones auto-created when a student requests help with a document or a process step gets marked blocked."
                img={imgTasksList}
                alt="Tasks list"
              />
              <Step
                n={7}
                title="Publish a visa approval"
                body="Content Manager → Visa Approval. When a student's visa comes through, add an entry here (name, university, programme, date, and the approval photo/poster) — it appears on the public 'Visa Approvals' page and the homepage automatically."
                img={imgVisaApprovalsList}
                alt="Visa approvals list"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* SOCIAL TEAM */}
      {active === "social" && (
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:px-10">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldDark">For the social/marketing team</div>
            <h2 className="mt-2 font-display text-[30px] leading-tight sm:text-[40px]">
              Content, not students.
            </h2>
            <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-askari-textBody">
              You log into the same admin panel too, but your view is the mirror image of an
              advisor's — no Students, Documents, Applications, Tasks, Notes or Leads at all.
              That boundary is enforced on the server, not just hidden in the menu.
            </p>

            <div className="mt-4 divide-y divide-askari-navy/[0.08]">
              <Step
                n={1}
                title="Write a blog article"
                body="Content Manager → Blog Post. Title, category, excerpt and a body made of simple heading/paragraph/list/table blocks — this is the public site's Journal."
                img={imgBlogPostsList}
                alt="Blog posts list"
              />
              <Step
                n={2}
                title="Testimonials, glossary, social posts"
                body="Same pattern — Content Manager → Testimonial (homepage/Stories quotes), Glossary Term (the plain-English glossary page), and Social Post (your own content calendar for Instagram/Facebook/WhatsApp)."
              />
              <Step
                n={3}
                title="You can also publish visa approvals"
                body="Content Manager → Visa Approval is shared with Advisors — whichever of you has the name, university and approval date first can publish it to the public wall."
                img={imgVisaApprovalsList}
                alt="Visa approvals list"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* STUDENTS */}
      {active === "students" && (
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:px-10">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-askari-goldDark">For students</div>
            <h2 className="mt-2 font-display text-[30px] leading-tight sm:text-[40px]">
              Everything about your file, in one place.
            </h2>
            <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-askari-textBody">
              Your advisor sets up your login — there's no sign-up form. Once you have it,
              here's what you'll see.
            </p>

            <div className="mt-4 divide-y divide-askari-navy/[0.08]">
              <Step
                n={1}
                title="Log in"
                body="Go to yoursite.com/portal/login with the email and password your advisor gave you."
                img={imgPortalLogin}
                alt="Student portal login screen"
              />
              <Step
                n={2}
                title="Your overview"
                body="Your current pipeline stage at a glance, how many applications and documents are on file, and your target intake."
                img={imgPortalDashboard}
                alt="Student portal dashboard"
              />
              <Step
                n={3}
                title="Your process, step by step"
                body="The honest, detailed version of 'where am I in this' — eight fixed stages, each with real written notes from your advisor, not just a status pill."
                img={imgPortalProcess}
                alt="Student portal process timeline"
              />
              <Step
                n={4}
                title="Upload documents, or ask for help getting one"
                body={
                  <>
                    A checklist of everything your file needs. If you have the file, upload it —
                    your advisor sees it immediately. If you don't have it yet and don't know how
                    to get it (common for things like a CIMEA statement), click{" "}
                    <strong>"I need help getting this"</strong> instead — it notifies your advisor
                    directly rather than leaving you stuck.
                  </>
                }
                img={imgPortalDocuments}
                alt="Student portal documents checklist"
              />
            </div>

            <div className="mt-10 rounded-[22px] bg-askari-navy p-8 text-askari-cream">
              <div className="font-display text-xl font-bold">Don't have a login yet?</div>
              <p className="mt-2 text-sm text-askari-cream/70">
                Only an advisor can create your account — there's no self sign-up.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_PAKISTAN}`}
                target="_blank"
                rel="noreferrer"
                className="btn-glow-gold mt-5 inline-block rounded-full bg-askari-gold px-6 py-3.5 text-sm font-bold text-askari-navy"
              >
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
