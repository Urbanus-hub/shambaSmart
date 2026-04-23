import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Field, FieldUpdate } from "../types";
import {
  createUpdate,
  fetchField,
  fetchUpdates,
  updateField as updateFieldService,
} from "../services/fieldService";
import { StatusBadge, StageBadge } from "../components/StatusBadge";
import { UpdateForm } from "../components/UpdateForm";
import { Spinner } from "../components/Spinner";
import { ArrowLeft, Calendar, Clock, Leaf, User, Timer } from "lucide-react";
import { toast } from "sonner";

const DETAIL_IMAGES = [
  "https://images.pexels.com/photos/15211721/pexels-photo-15211721.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/4198586/pexels-photo-4198586.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/16021494/pexels-photo-16021494.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/33983460/pexels-photo-33983460.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/4077174/pexels-photo-4077174.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

function getDetailImage(fieldId: string): string {
  let hash = 0;
  for (let i = 0; i < fieldId.length; i++) {
    hash = (hash * 31 + fieldId.charCodeAt(i)) | 0;
  }
  return DETAIL_IMAGES[Math.abs(hash) % DETAIL_IMAGES.length];
}

function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FieldDetailPage() {
  const { id } = useParams();
  const [field, setField] = useState<Field | null>(null);
  const [updates, setUpdates] = useState<FieldUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const [fieldData, updateData] = await Promise.all([
          fetchField(id),
          fetchUpdates(id),
        ]);
        setField(fieldData);
        setUpdates(updateData);
      } catch {
        toast.error("Failed to load field details");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleUpdate = async (note: string, stage: any) => {
    if (!id) return;
    try {
      // If stage has changed, update the field stage first
      if (stage !== field?.stage) {
        await updateFieldService(id, { stage });
        setField((prev) => (prev ? { ...prev, stage } : prev));
      }

      const update = await createUpdate(id, note);
      setUpdates((prev) => [update, ...prev]);
      toast.success("Update logged successfully");
    } catch {
      toast.error("Failed to save update");
    }
  };

  if (loading) return <Spinner />;

  if (!field) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-slate-500">Field not found.</p>
        <Link to="/" className="text-brand-600 text-sm font-medium mt-2 inline-block">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-up">
      {/* Back link */}
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to fields
      </button>

      {/* Hero banner for field */}
      <div className="relative rounded-xl overflow-hidden h-44 md:h-52">
        <img
          src={getDetailImage(field.id)}
          alt={`${field.crop_type} field`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex items-end h-full px-6 md:px-8 pb-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {field.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <Leaf className="w-4 h-4 text-brand-300" />
              <span className="text-sm text-white/80">{field.crop_type}</span>
            </div>
          </div>
          {field.status && <StatusBadge status={field.status} />}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          {/* Field Details Card */}
          <div className="card">
            <h2 className="text-base font-semibold text-slate-900 mb-4">
              Field Details
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-surface-muted p-4 border border-border-light">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Stage
                </p>
                <div className="mt-2">
                  <StageBadge stage={field.stage} />
                </div>
              </div>

              <div className="rounded-lg bg-surface-muted p-4 border border-border-light">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Planting Date
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {formatDate(field.planting_date)}
                </p>
              </div>

              <div className="rounded-lg bg-surface-muted p-4 border border-border-light">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Timer className="w-3 h-3" /> Growth Duration
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {field.growth_duration_days
                    ? `${field.growth_duration_days} days`
                    : "N/A"}
                </p>
              </div>

              <div className="rounded-lg bg-surface-muted p-4 border border-border-light">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Expected Harvest
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {formatDate(field.expected_harvest_date)}
                </p>
              </div>

              <div className="rounded-lg bg-surface-muted p-4 border border-border-light sm:col-span-2 lg:col-span-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" /> Assigned Agent
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {field.agent_name ? (
                    <>
                      {field.agent_name}
                      {field.agent_employee_id && (
                        <span className="text-slate-500 ml-1.5 font-normal">
                          ({field.agent_employee_id})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-slate-400">Unassigned</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Updates Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                Latest Updates
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {updates.length} {updates.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {updates.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">
                No updates yet. Log your first observation below.
              </p>
            ) : (
              <div className="space-y-3">
                {updates.map((update) => (
                  <article
                    key={update.id}
                    className="rounded-lg border border-border-light bg-surface-secondary p-4"
                  >
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {new Date(update.created_at).toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      {update.note}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Update Form */}
        <div className="lg:sticky lg:top-20 h-fit">
          <UpdateForm onSubmit={handleUpdate} currentStage={field.stage} />
        </div>
      </div>
    </div>
  );
}
