import { Link } from "react-router-dom";
import type { Field } from "../types";
import { StatusBadge, StageBadge } from "./StatusBadge";
import { Calendar, Clock, Leaf, ArrowRight, User } from "lucide-react";

const FIELD_IMAGES = [
  "https://images.pexels.com/photos/15211721/pexels-photo-15211721.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1",
  "https://images.pexels.com/photos/4198586/pexels-photo-4198586.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1",
  "https://images.pexels.com/photos/16021494/pexels-photo-16021494.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1",
  "https://images.pexels.com/photos/33983460/pexels-photo-33983460.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1",
  "https://images.pexels.com/photos/4077174/pexels-photo-4077174.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1",
  "https://images.pexels.com/photos/27147659/pexels-photo-27147659.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1",
];

function getFieldImage(fieldId: string): string {
  // Deterministic image based on field id
  let hash = 0;
  for (let i = 0; i < fieldId.length; i++) {
    hash = (hash * 31 + fieldId.charCodeAt(i)) | 0;
  }
  return FIELD_IMAGES[Math.abs(hash) % FIELD_IMAGES.length];
}

function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FieldCard({
  field,
  onEdit,
  onDelete,
  isAdmin,
}: {
  field: Field;
  onEdit?: (field: Field) => void;
  onDelete?: (field: Field) => void;
  isAdmin?: boolean;
}) {
  return (
    <div className="group relative block rounded-xl border border-border bg-surface shadow-xs hover:shadow-sm hover:border-brand-200 transition-all duration-200 overflow-hidden">
      <Link to={`/fields/${field.id}`} className="block h-full">
        {/* Card Image */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={getFieldImage(field.id)}
            alt={`${field.crop_type} field`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <StatusBadge status={field.status || "Active"} />
          </div>
          <div className="absolute bottom-3 left-3">
            <h3 className="text-base font-semibold text-white drop-shadow-sm">
              {field.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-sm text-white/80">
              <Leaf className="w-3.5 h-3.5 shrink-0" />
              <span>{field.crop_type}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Planted
              </p>
              <p className="text-sm font-medium text-slate-700">
                {formatDate(field.planting_date)}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Harvest
              </p>
              <p className="text-sm font-medium text-slate-700">
                {formatDate(field.expected_harvest_date)}
              </p>
            </div>
          </div>

          {/* Growth duration */}
          {field.growth_duration_days != null && (
            <p className="mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">
                {field.growth_duration_days}
              </span>{" "}
              days growth cycle
            </p>
          )}

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-border-light flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <StageBadge stage={field.stage} />
              {(field as any).agent_name && (
                <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 min-w-0">
                  <User className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {(field as any).agent_name}
                    {(field as any).agent_employee_id && (
                      <span className="text-slate-400 ml-0.5">
                        ({(field as any).agent_employee_id})
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-brand-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              View <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>

      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit(field);
              }}
              className="p-1.5 bg-white/90 hover:bg-white rounded-md text-slate-700 shadow-sm transition-colors"
              title="Edit Field"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this field?")) {
                  onDelete(field);
                }
              }}
              className="p-1.5 bg-white/90 hover:bg-red-50 hover:text-red-600 rounded-md text-slate-700 shadow-sm transition-colors"
              title="Delete Field"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
