import { useState, useEffect } from "react";
import { FieldCard } from "../components/FieldCard";
import { Spinner } from "../components/Spinner";
import { EmptyState } from "../components/EmptyState";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";
import {
  LayoutDashboard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const BANNER_IMAGE =
  "https://images.pexels.com/photos/1571134/pexels-photo-1571134.jpeg?auto=compress&cs=tinysrgb&w=1200";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="card flex items-start justify-between hover:shadow-sm transition-shadow">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl font-semibold text-slate-900 mt-2 tracking-tight">
          {value}
        </p>
      </div>
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFields();
        setFields(data);
      } catch {
        toast.error("Failed to load fields");
        setFields([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const total = fields.length;
  const activeCount = fields.filter((f) => f.status === "Active").length;
  const riskCount = fields.filter((f) => f.status === "At Risk").length;
  const completedCount = fields.filter((f) => f.status === "Completed").length;

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6 animate-in fade-in slide-up">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden h-48 md:h-56">
        <img
          src={BANNER_IMAGE}
          alt="Vibrant farmlands aerial view — Tom Fisk on Pexels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/40" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300 mb-1">
            Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Platform Overview
          </h1>
          <p className="text-sm text-white/60 mt-1 max-w-md">
            High-level metrics across all registered fields.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Fields"
          value={total}
          icon={LayoutDashboard}
          color="bg-brand-50 text-brand-600"
        />
        <StatCard
          label="Active"
          value={activeCount}
          icon={TrendingUp}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="At Risk"
          value={riskCount}
          icon={AlertTriangle}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Completed"
          value={completedCount}
          icon={CheckCircle}
          color="bg-slate-100 text-slate-500"
        />
      </div>

      {/* Recent Fields */}
      <div>
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          Recent Assignments
        </h2>

        {fields.length === 0 ? (
          <EmptyState
            title="No active fields"
            description="There are no fields registered in the database yet."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fields.slice(0, 6).map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
