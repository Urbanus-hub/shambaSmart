import type { Field } from "../types";
import { StatusBadge } from "./StatusBadge";
import { Link } from "react-router-dom";

export function FieldCard({ field }: { field: Field }) {
  return (
    <Link
      to={`/fields/${field.id}`}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Field
          </p>
          <h3 className="font-display text-xl text-slate-900">{field.name}</h3>
        </div>
        {field.status && <StatusBadge status={field.status} />}
      </div>
      <p className="mt-2 text-sm text-slate-600">{field.crop_type}</p>
      <div className="mt-4 grid gap-2 text-xs text-slate-500 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
          <span className="uppercase tracking-widest text-[10px]">Planted</span>
          <span className="font-semibold text-slate-700">{field.planting_date}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
          <span className="uppercase tracking-widest text-[10px]">Stage</span>
          <span className="font-semibold text-slate-700">{field.stage}</span>
        </div>
      </div>
    </Link>
  );
}
