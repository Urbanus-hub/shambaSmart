import { useEffect, useMemo, useState } from "react";
import { FieldCard } from "../components/FieldCard";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";

export function AdminDashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchFields();
      setFields(data);
      setLoading(false);
    };
    load();
  }, []);

  const stats = useMemo(() => {
    return fields.reduce(
      (acc, field) => {
        acc.total += 1;
        if (field.status) {
          acc.statuses[field.status] = (acc.statuses[field.status] || 0) + 1;
        }
        return acc;
      },
      { total: 0, statuses: {} as Record<string, number> },
    );
  }, [fields]);

  const activeCount = stats.statuses["Active"] || 0;
  const atRiskCount = stats.statuses["At Risk"] || 0;
  const completedCount = stats.statuses["Completed"] || 0;

  if (loading) {
    return <p className="text-sm text-slate-500">Loading fields...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Coordinator dashboard
            </p>
            <h2 className="mt-2 font-display text-2xl text-slate-900">
              Season overview
            </h2>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            {atRiskCount > 0
              ? `${atRiskCount} fields at risk`
              : "All fields on track"}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Total fields
            </p>
            <p className="mt-3 font-display text-3xl text-slate-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-700">
              Active
            </p>
            <p className="mt-3 font-display text-3xl text-emerald-900">
              {activeCount}
            </p>
          </div>
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-700">
              At risk
            </p>
            <p className="mt-3 font-display text-3xl text-rose-900">
              {atRiskCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Completed
            </p>
            <p className="mt-3 font-display text-3xl text-slate-900">
              {completedCount}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
      </section>
    </div>
  );
}
