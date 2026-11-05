import { usePageMeta } from "@/hooks/usePageMeta";
import { ScholarshipsBrowser } from "@/components/ScholarshipsBrowser";

export default function PortalScholarships() {
  usePageMeta("Scholarships", "Browse regional (DSU/ERSU) scholarship agencies across Italy.");
  return (
    <div>
      <h1 className="text-display-3">Scholarships</h1>
      <p className="mt-1 text-askari-textBody2">
        Regional scholarship agencies you may be eligible for, independent of your university match.
      </p>
      <div className="mt-6">
        <ScholarshipsBrowser />
      </div>
    </div>
  );
}
