import type { FieldStatus } from "../types";

const statusStyles: Record<FieldStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "At Risk": "bg-rose-50 text-rose-700 border-rose-200",
  Active: "bg-amber-50 text-amber-700 border-amber-200",
};

export function StatusBadge({ status }: { status: FieldStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
