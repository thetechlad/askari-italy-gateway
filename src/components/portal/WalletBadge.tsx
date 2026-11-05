import { useMyStudent } from "@/hooks/usePortalData";

export function WalletBadge() {
  const { data: student } = useMyStudent();
  if (!student) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-askari-gold/15 px-3 py-1.5 text-xs font-semibold text-askari-gold">
      {student.creditBalance} {student.creditBalance === 1 ? "credit" : "credits"}
    </span>
  );
}
