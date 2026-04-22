import { useEffect, useState } from "react";
import { FieldCard } from "../components/FieldCard";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";

// Mock Sample data to reflect assigned fields for the agent
const MOCK_ASSIGNED_FIELDS: Field[] = [
  { id: "101", name: "Plot Alpha (Mock)", crop_type: "Maize", planting_date: "2026-03-01", stage: "GROWING", assigned_agent_id: "1", status: "Active", image_url: "https://images.unsplash.com/photo-1601334857416-8c43cb8d2cd1?auto=format&fit=crop&q=80&w=600" },
  { id: "103", name: "Plot Gamma (Mock)", crop_type: "Beans", planting_date: "2026-04-01", stage: "PLANTED", assigned_agent_id: "1", status: "At Risk", image_url: "https://images.unsplash.com/photo-1589923188900-85dae5243404?auto=format&fit=crop&q=80&w=600" },
];

export function AgentDashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFields();
        setFields(data.length > 0 ? data : MOCK_ASSIGNED_FIELDS);
      } catch (err) {
        setFields(MOCK_ASSIGNED_FIELDS);
      }
      setLoading(false);
    };
    load();
  }, []);

  const atRiskCount = fields.filter((field) => field.status === "At Risk").length;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e0f6e9] border-t-[#36a783]"></div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest animate-pulse">Loading Assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <section className="rounded-[2rem] border border-[#e0f6e9] bg-white p-6 md:p-8 shadow-sm relative overflow-hidden">
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f2fbf5] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#36a783] font-bold">
              Agent Portal
            </p>
            <h2 className="mt-1 font-display text-4xl text-[#1e5545] tracking-tight">
              My Logistics
            </h2>
          </div>
          <div className="rounded-full border border-[#c2ecd6] bg-[#f2fbf5] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#244f3b] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#36a783] animate-pulse"></span>
            {fields.length} Assignments Active
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 relative z-10">
          <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:bg-white hover:shadow-md hover:border-[#e0f6e9]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center justify-between">
              Fields to Visit
              <svg className="w-4 h-4 text-slate-400 group-hover:text-[#36a783] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </p>
            <p className="mt-3 font-display text-4xl text-slate-900 group-hover:text-[#1e5545] transition-colors">
              {fields.length}
            </p>
          </div>

          <div className={`group rounded-2xl border p-5 transition-all hover:shadow-md hover:-translate-y-1 ${
            atRiskCount > 0 ? "border-amber-200 bg-amber-50" : "border-[#c2ecd6] bg-[#f2fbf5]"
          }`}>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-between ${
              atRiskCount > 0 ? "text-amber-600" : "text-[#36a783]"
            }`}>
              Immediate Attention
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </p>
            <p className={`mt-3 font-display text-4xl ${
              atRiskCount > 0 ? "text-amber-900" : "text-[#1e5545]"
            }`}>
              {atRiskCount}
            </p>
          </div>

          <div className="group rounded-2xl border border-[#e0f6e9] bg-[#f8f5ef] p-5 transition-all hover:bg-white hover:shadow-md hover:border-[#c2ecd6]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#244f3b] mb-2 flex items-center justify-between">
              Priority Route
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </p>
            <p className="text-sm text-slate-600 leading-relaxed group-hover:text-[#1e5545] transition-colors">
              Begin with fields reporting no updates in the past <span className="font-bold text-[#36a783]">7 days</span>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-display text-xl text-[#1e5545]">Active Roster</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-[#36a783]">By distance (Mock)</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </section>
    </div>
  );
}
