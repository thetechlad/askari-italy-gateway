import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMyChecklistItems, useReplaceChecklistItem, useRequestChecklistHelp } from "@/hooks/usePortalData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { CHECKLIST_STATUS_LABELS, type ChecklistItem } from "@/lib/portal";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/Reveal";
import { useRevealBatch } from "@/hooks/useRevealBatch";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { Check, Clock, HelpCircle } from "lucide-react";

const STATUS_STYLES: Record<ChecklistItem["status"], string> = {
  Checked: "border-askari-green/30 bg-askari-green/10",
  Uploaded: "border-askari-gold/40 bg-askari-gold/10",
  HumanReview: "border-askari-coral/30 bg-askari-coral/10",
  NeedsReplacement: "border-askari-coral/30 bg-askari-coral/10",
  Required: "border-askari-navy/10 bg-askari-white",
};

function ChecklistTile({ item }: { item: ChecklistItem }) {
  const replaceMutation = useReplaceChecklistItem();
  const helpMutation = useRequestChecklistHelp();
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpNote, setHelpNote] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    replaceMutation.mutate({ itemId: item.id, file });
    e.target.value = "";
  };

  const submitHelp = () => {
    if (!helpNote.trim()) return;
    helpMutation.mutate(
      { itemId: item.id, note: helpNote },
      { onSuccess: () => { setHelpOpen(false); setHelpNote(""); } }
    );
  };

  const needsAction = item.status === "Required" || item.status === "NeedsReplacement";

  return (
    <div className={`reveal-item rounded-xl border px-4 py-3.5 text-sm ${STATUS_STYLES[item.status]}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="font-semibold">{item.label}</div>
          {item.status === "Checked" && (
            <span className="mt-0.5 flex items-center gap-1 text-xs text-askari-green">
              <Check className="h-3.5 w-3.5" /> {CHECKLIST_STATUS_LABELS[item.status]}
            </span>
          )}
          {item.status === "Uploaded" && (
            <span className="mt-0.5 flex items-center gap-1 text-xs text-askari-goldDark">
              <Clock className="h-3.5 w-3.5" /> {CHECKLIST_STATUS_LABELS[item.status]}
            </span>
          )}
          {item.status === "HumanReview" && (
            <span className="mt-0.5 flex items-center gap-1 text-xs text-askari-coral">
              <HelpCircle className="h-3.5 w-3.5" /> {CHECKLIST_STATUS_LABELS[item.status]}
            </span>
          )}
          {item.reviewNote && item.status === "HumanReview" && (
            <p className="mt-1 text-xs italic text-askari-textBody2">"{item.reviewNote}"</p>
          )}
        </div>
        {needsAction && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={replaceMutation.isPending}
              className="rounded-full bg-askari-navy px-3 py-1.5 text-xs font-semibold text-askari-cream disabled:opacity-50"
            >
              {replaceMutation.isPending ? "Uploading…" : "Upload"}
            </button>
            <button
              type="button"
              onClick={() => setHelpOpen((v) => !v)}
              className="rounded-full border border-askari-navy/20 px-3 py-1.5 text-xs font-medium text-askari-textBody2 hover:bg-askari-sand"
            >
              Get help
            </button>
            <input ref={fileInputRef} type="file" onChange={handleFileSelected} className="hidden" />
          </div>
        )}
        {(item.status === "Checked" || item.status === "Uploaded") && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full border border-askari-navy/20 px-3 py-1.5 text-xs font-medium text-askari-textBody2 hover:bg-askari-sand"
          >
            Replace
            <input ref={fileInputRef} type="file" onChange={handleFileSelected} className="hidden" />
          </button>
        )}
      </div>
      {helpOpen && (
        <div className="mt-3 flex flex-col gap-2 border-t border-askari-navy/10 pt-3">
          <textarea
            rows={2}
            value={helpNote}
            onChange={(e) => setHelpNote(e.target.value)}
            placeholder="What do you need help with?"
            className="input-field resize-y"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={submitHelp}
              disabled={!helpNote.trim() || helpMutation.isPending}
              className="rounded-full bg-askari-coral px-4 py-2 text-xs font-semibold text-askari-cream disabled:opacity-50"
            >
              {helpMutation.isPending ? "Sending…" : "Send request"}
            </button>
            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              className="rounded-full px-4 py-2 text-xs font-medium text-askari-textBody2 hover:bg-askari-sand"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {replaceMutation.isError && (
        <p className="mt-2 text-xs text-red-600">
          {replaceMutation.error instanceof Error ? replaceMutation.error.message : "Upload failed."}
        </p>
      )}
    </div>
  );
}

export default function PortalDocuments() {
  usePageMeta("Your checklist", "Upload your document checklist — matching unlocks once everything required is verified.");
  const { data: items, isLoading } = useMyChecklistItems();
  const checklistRef = useRef<HTMLDivElement>(null);
  useRevealBatch(checklistRef, ".reveal-item", [items?.length ?? 0]);

  const requiredItems = (items ?? []).filter((i) => i.required);
  const checkedCount = requiredItems.filter((i) => i.status === "Checked").length;
  const ready = requiredItems.length > 0 && checkedCount === requiredItems.length;

  return (
    <div>
      <h1 className="text-display-3">Your checklist</h1>
      <p className="mt-1 text-askari-textBody2">
        Upload each item below — your advisor reviews it, and matching unlocks once everything required is verified.
      </p>

      {!isLoading && requiredItems.length > 0 && (
        <p className="mt-3 text-sm font-semibold text-askari-textBody2">
          {checkedCount} of {requiredItems.length} required items verified
        </p>
      )}

      <Reveal>
        <div ref={checklistRef} className="mt-4 flex flex-col gap-2.5">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[60px] rounded-xl" />)}
          {items?.map((item) => <ChecklistTile key={item.documentId} item={item} />)}
        </div>
      </Reveal>

      {ready && (
        <Reveal delay={80}>
          <div className="card-flat mt-6 flex flex-wrap items-center justify-between gap-3 bg-askari-green/10 p-5">
            <div>
              <div className="font-semibold text-askari-green">Your file is ready.</div>
              <p className="text-sm text-askari-textBody2">You can now run your university matches.</p>
            </div>
            <Link to="/portal/results" className="btn-primary">
              Run my shortlist
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
