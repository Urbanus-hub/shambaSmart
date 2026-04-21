import { useEffect, useState } from "react";
import { FieldCard } from "../components/FieldCard";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";

export function AgentDashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  const atRiskCount = fields.filter(
    (field) => field.status === "At Risk",
  ).length;

  useEffect(() => {
    const load = async () => {
      const data = await fetchFields();
      setFields(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading assignments...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Agent dashboard
            </p>
            <h2 className="mt-2 font-display text-2xl text-slate-900">
              Assigned fields
            </h2>
          </div>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600">
            {fields.length} assigned
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Fields to visit
            </p>
            <p className="mt-3 font-display text-3xl text-slate-900">
              {fields.length}
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
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-700">
              Next action
            </p>
            <p className="mt-3 text-sm text-emerald-900">
              Start with fields that have no updates in 7 days.
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
