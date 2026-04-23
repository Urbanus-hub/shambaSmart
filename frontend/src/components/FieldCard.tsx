import type { Field } from "../types";
import { StatusBadge } from "./StatusBadge";
import { Link } from "react-router-dom";

export function FieldCard({ field }: { field: Field }) {
  // If no mock image provided, fall back to a subtle farm pattern
  const hasImage = !!field.image_url;

  return (
    <Link
      to={`/fields/${field.id}`}
      className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c2ecd6] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#e0f6e9]"
    >
      <div
        className={`relative h-40 w-full overflow-hidden rounded-2xl ${hasImage ? "bg-slate-100" : "bg-[#1e5545]"}`}
      >
        {hasImage ? (
          <img
            src={field.image_url}
            alt={`Field ${field.name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#36a783 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <h3 className="font-display text-xl text-white drop-shadow-md truncate">
            {field.name}
          </h3>
          {field.status && <StatusBadge status={field.status} />}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-slate-700">
            {field.crop_type}
          </p>
          {field.assigned_agent_id && (
            <span className="flex items-center gap-1.5 bg-[#f0f9f4] text-[#1e5545] px-2.5 py-1 rounded-lg border border-[#c2ecd6] shadow-sm text-[10px] font-bold uppercase tracking-wider">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Agent {field.assigned_agent_id}
            </span>
          )}
        </div>

        <div className="grid gap-3 text-xs text-slate-500 md:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-2.5 transition-colors group-hover:bg-[#f2fbf5]">
            <span className="uppercase tracking-widest text-[9px] font-bold text-slate-400 group-hover:text-[#36a783]">
              Planted
            </span>
            <span className="font-bold text-slate-900 group-hover:text-[#1e5545]">
              {field.planting_date}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-2.5 transition-colors group-hover:bg-[#f2fbf5]">
            <span className="uppercase tracking-widest text-[9px] font-bold text-slate-400 group-hover:text-[#36a783]">
              Stage
            </span>
            <span className="font-bold text-slate-900 group-hover:text-[#1e5545]">
              {field.stage}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
