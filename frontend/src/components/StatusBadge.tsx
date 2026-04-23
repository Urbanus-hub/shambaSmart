import type { FieldStatus, FieldStage } from "../types";

const statusConfig: Record<FieldStatus, { dot: string; badge: string }> = {
  Active: {
    dot: "bg-status-active",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  },
  "At Risk": {
    dot: "bg-status-risk",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  Completed: {
    dot: "bg-status-completed",
    badge: "bg-slate-50 text-slate-600 ring-slate-500/20",
  },
};

export function StatusBadge({ status }: { status: FieldStatus }) {
  const config = statusConfig[status] ?? statusConfig.Active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.badge}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot} ${status === "Active" ? "animate-pulse" : ""}`}
      />
      {status}
    </span>
  );
}

const stageEmoji: Record<FieldStage, string> = {
  PLANTED: "🌱",
  GROWING: "🌿",
  READY: "🌾",
  HARVESTED: "🚜",
};

export function StageBadge({ stage }: { stage: FieldStage }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
      <span className="text-[11px]">{stageEmoji[stage]}</span>
      {stage}
    </span>
  );
}
