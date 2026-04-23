import { useEffect, useState } from "react";
import { FieldCard } from "../components/FieldCard";
import { Spinner } from "../components/Spinner";
import { EmptyState } from "../components/EmptyState";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";
import { AlertTriangle, Map, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const BANNER_IMAGE =
  "https://images.pexels.com/photos/16021494/pexels-photo-16021494.jpeg?auto=compress&cs=tinysrgb&w=1200";

export function AgentDashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFields();
        setFields(data);
      } catch {
        toast.error("Failed to load assignments");
        setFields([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const activeCount = fields.filter((f) => f.status === "Active").length;
  const atRiskCount = fields.filter((f) => f.status === "At Risk").length;

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6 animate-in fade-in slide-up">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden h-44 md:h-52">
        <img
          src={BANNER_IMAGE}
          alt="Rural field at sunrise — Thomas P on Pexels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/40" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300 mb-1">
            Agent Portal
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            My Assignments
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Fields assigned to you for monitoring.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Fields
            </p>
            <p className="text-3xl font-semibold text-slate-900 mt-2 tracking-tight">
              {fields.length}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Map className="w-5 h-5" />
          </div>
        </div>

        <div className="card flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active
            </p>
            <p className="text-3xl font-semibold text-slate-900 mt-2 tracking-tight">
              {activeCount}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="card flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Needs Attention
            </p>
            <p
              className={`text-3xl font-semibold mt-2 tracking-tight ${atRiskCount > 0 ? "text-amber-600" : "text-slate-900"}`}
            >
              {atRiskCount}
            </p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${atRiskCount > 0 ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Fields */}
      <div>
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          Your Fields
        </h2>
        {fields.length === 0 ? (
          <EmptyState
            title="No assignments yet"
            description="You don't have any fields assigned to you."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
