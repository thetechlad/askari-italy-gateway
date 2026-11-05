import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyStudent, useUpdateMyProfile, useUploadResume } from "@/hooks/usePortalData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { Reveal } from "@/components/Reveal";
import { fileUrl } from "@/lib/portal";
import { Paperclip } from "lucide-react";

export default function PortalProfile() {
  usePageMeta("My profile", "Tell us your academic and budget details so we can match you to real programmes.");
  const { data: student } = useMyStudent();
  const updateProfile = useUpdateMyProfile();
  const uploadResume = useUploadResume();
  const navigate = useNavigate();
  const submitRef = useRef<HTMLButtonElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  useMagneticButton(submitRef);

  const [form, setForm] = useState({
    level: "Masters" as "Bachelors" | "Masters",
    cgpaPercentage: "",
    specializationKeywords: "",
    budgetAnnualEUR: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!student) return;
    setForm({
      level: student.level ?? "Masters",
      cgpaPercentage: student.cgpaPercentage?.toString() ?? "",
      specializationKeywords: student.specializationKeywords ?? "",
      budgetAnnualEUR: student.budgetAnnualEUR?.toString() ?? "",
      linkedinUrl: student.linkedinUrl ?? "",
      portfolioUrl: student.portfolioUrl ?? "",
    });
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    updateProfile.mutate(
      {
        level: form.level,
        cgpaPercentage: form.cgpaPercentage ? Number(form.cgpaPercentage) : undefined,
        specializationKeywords: form.specializationKeywords || undefined,
        budgetAnnualEUR: form.budgetAnnualEUR ? Number(form.budgetAnnualEUR) : undefined,
        linkedinUrl: form.linkedinUrl || undefined,
        portfolioUrl: form.portfolioUrl || undefined,
      },
      { onSuccess: () => setSaved(true) }
    );
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadResume.mutate(file);
    e.target.value = "";
  };

  return (
    <div>
      <h1 className="text-display-3">Your profile</h1>
      <p className="mt-1 text-askari-textBody2">
        These details power your university matches — the more accurate, the better your shortlist.
      </p>

      <Reveal>
        <form className="card-flat mt-6 flex flex-col gap-3.5 bg-askari-white p-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              Degree level
            </span>
            <select
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: e.target.value as "Bachelors" | "Masters" }))}
              className="input-field"
            >
              <option value="Masters">Masters</option>
              <option value="Bachelors">Bachelors</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              CGPA (as a percentage, e.g. 72 for 72%)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={form.cgpaPercentage}
              onChange={(e) => setForm((f) => ({ ...f, cgpaPercentage: e.target.value }))}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              Annual budget (EUR)
            </span>
            <input
              type="number"
              min={0}
              step="100"
              value={form.budgetAnnualEUR}
              onChange={(e) => setForm((f) => ({ ...f, budgetAnnualEUR: e.target.value }))}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              What do you want to study? (a few keywords)
            </span>
            <input
              type="text"
              placeholder="e.g. computer science, data, software"
              value={form.specializationKeywords}
              onChange={(e) => setForm((f) => ({ ...f, specializationKeywords: e.target.value }))}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              LinkedIn profile (optional)
            </span>
            <input
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={form.linkedinUrl}
              onChange={(e) => setForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              Portfolio / website (optional)
            </span>
            <input
              type="url"
              placeholder="https://..."
              value={form.portfolioUrl}
              onChange={(e) => setForm((f) => ({ ...f, portfolioUrl: e.target.value }))}
              className="input-field"
            />
          </label>
          <div className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-askari-textBody2">
              Resume / CV (optional)
            </span>
            <input ref={resumeInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                disabled={uploadResume.isPending}
                className="btn-outline-dark disabled:opacity-60"
              >
                {uploadResume.isPending ? "Uploading…" : student?.resumeDocument ? "Replace resume" : "Upload resume"}
              </button>
              {student?.resumeDocument && (
                <a
                  href={fileUrl(student.resumeDocument.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-askari-goldMuted hover:underline"
                >
                  <Paperclip className="h-3.5 w-3.5" /> {student.resumeDocument.name}
                </a>
              )}
            </div>
          </div>
          {updateProfile.isError && (
            <p className="text-sm text-red-600">
              {updateProfile.error instanceof Error ? updateProfile.error.message : "Could not save your profile."}
            </p>
          )}
          {saved && !updateProfile.isPending && <p className="text-sm text-askari-green">Saved.</p>}
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              ref={submitRef}
              type="submit"
              disabled={updateProfile.isPending}
              className="btn-primary disabled:opacity-60"
            >
              {updateProfile.isPending ? "Saving…" : "Save profile"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/portal/results")}
              className="btn-outline-dark"
            >
              Go to my results
            </button>
          </div>
        </form>
      </Reveal>
    </div>
  );
}
