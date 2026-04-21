import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Field, FieldUpdate } from "../types";
import {
  createUpdate,
  fetchField,
  fetchUpdates,
} from "../services/fieldService";
import { StatusBadge } from "../components/StatusBadge";
import { UpdateForm } from "../components/UpdateForm";

export function FieldDetailPage() {
  const { id } = useParams();
  const [field, setField] = useState<Field | null>(null);
  const [updates, setUpdates] = useState<FieldUpdate[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        return;
      }
      const data = await fetchField(id);
      const updateData = await fetchUpdates(id);
      setField(data);
      setUpdates(updateData);
    };
    load();
  }, [id]);

  const handleUpdate = async (note: string) => {
    if (!id) {
      return;
    }
    const update = await createUpdate(id, note);
    setUpdates((prev) => [update, ...prev]);
  };

  if (!field) {
    return <p className="text-sm text-slate-500">Loading field...</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Field profile
              </p>
              <h2 className="mt-2 font-display text-3xl text-slate-900">
                {field.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{field.crop_type}</p>
            </div>
            {field.status && <StatusBadge status={field.status} />}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Stage
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {field.stage}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Planted
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {field.planting_date}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Assigned agent
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {field.assigned_agent_id || "Unassigned"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-slate-900">
              Latest updates
            </h3>
            <span className="text-xs text-slate-500">
              {updates.length} entries
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {updates.length === 0 && (
              <p className="text-sm text-slate-500">No updates yet.</p>
            )}
            {updates.map((update) => (
              <article
                key={update.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  {new Date(update.created_at).toLocaleString()}
                </p>
                <p className="mt-2 text-sm text-slate-700">{update.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <UpdateForm onSubmit={handleUpdate} />
    </div>
  );
}
