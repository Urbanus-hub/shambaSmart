import { useEffect, useMemo, useState } from "react";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";
import { Activity, AlertTriangle, CheckCircle2, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SAMPLE_FIELDS: Field[] = [
  { id: "101", name: "Plot Alpha (Mock)", crop_type: "Maize", planting_date: "2026-03-01", stage: "GROWING", assigned_agent_id: "1", status: "Active", image_url: "https://images.unsplash.com/photo-1601334857416-8c43cb8d2cd1?auto=format&fit=crop&q=80&w=600" },
  { id: "102", name: "Plot Beta (Mock)", crop_type: "Wheat", planting_date: "2026-02-15", stage: "READY", assigned_agent_id: "3", status: "Completed", image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600" },
  { id: "103", name: "Plot Gamma (Mock)", crop_type: "Beans", planting_date: "2026-04-01", stage: "PLANTED", assigned_agent_id: "1", status: "At Risk", image_url: "https://images.unsplash.com/photo-1589923188900-85dae5243404?auto=format&fit=crop&q=80&w=600" },
];

const MOCK_MONTHLY_DATA = [
  { name: "Jan", planting: 40, harvest: 10 },
  { name: "Feb", planting: 60, harvest: 20 },
  { name: "Mar", planting: 80, harvest: 30 },
  { name: "Apr", planting: 40, harvest: 50 },
  { name: "May", planting: 20, harvest: 80 },
  { name: "Jun", planting: 10, harvest: 100 },
];

const MOCK_STAGE_DISTRIBUTION = [
  { name: "Planted", value: 30 },
  { name: "Growing", value: 50 },
  { name: "Ready", value: 15 },
  { name: "Harvested", value: 5 },
];
const STAGE_COLORS = ["#60a5fa", "#36a783", "#f59e0b", "#64748b"];

export function AdminDashboard() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFields();
        setFields(data.length ? data : [...SAMPLE_FIELDS]); 
      } catch (err) {
        setFields(SAMPLE_FIELDS); 
      }
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
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e0f6e9] border-t-[#36a783]"></div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200">
          <p className="text-slate-700 font-bold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm">
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#36a783] font-bold">
          Coordinator Portal
        </p>
        <h2 className="font-display text-4xl text-[#1e5545] tracking-tight">
          Season Analytics
        </h2>
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-8 w-24 h-24 bg-slate-50 rounded-full blur-2xl group-hover:bg-slate-100 transition-colors"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-500">
               <Sprout className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Total Fields</p>
          </div>
          <p className="font-display text-5xl text-[#1e5545] relative z-10">{stats.total}</p>
        </div>

        <div className="rounded-[2rem] border border-[#c2ecd6] bg-white p-6 shadow-sm hover:shadow-md hover:border-[#36a783] transition-all relative overflow-hidden group">
          <div className="absolute -right-4 -top-8 w-24 h-24 bg-[#e0f6e9] rounded-full blur-2xl group-hover:bg-[#c2ecd6]/50 transition-colors"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-[#f2fbf5] rounded-2xl text-[#36a783]">
               <Activity className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#36a783]">Active</p>
          </div>
          <p className="font-display text-5xl text-[#1e5545] relative z-10">{activeCount}</p>
        </div>

        <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all relative overflow-hidden group">
          <div className="absolute -right-4 -top-8 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100/80 transition-colors"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">At Risk</p>
          </div>
          <p className="font-display text-5xl text-amber-900 relative z-10">{atRiskCount}</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Completed</p>
          </div>
          <p className="font-display text-5xl text-slate-900 relative z-10">{completedCount}</p>
        </div>
      </section>

      {/* Analytics Charts */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Main Bar Chart */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl text-slate-900">Seasonal Forecast</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md text-slate-500">Volumetric</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                <Bar dataKey="planting" name="Fields Planted" stackId="a" fill="#36a783" radius={[0, 0, 4, 4]} barSize={30} />
                <Bar dataKey="harvest" name="Harvest Output" stackId="a" fill="#c2ecd6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Pie Chart */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <h3 className="font-display text-2xl text-slate-900 mb-6">Stage Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_STAGE_DISTRIBUTION}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {MOCK_STAGE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STAGE_COLORS[index % STAGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {MOCK_STAGE_DISTRIBUTION.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STAGE_COLORS[index] }}></div>
                <span className="text-xs font-semibold text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer shortcut */}
      <div className="pt-2">
         <div className="inline-flex rounded-xl bg-[#244f3b] p-1.5 shadow-sm">
            <Link to="/admin/fields" className="px-5 py-2.5 bg-[#244f3b] hover:bg-[#1a3d2d] text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              Manage Fields Registry <Activity className="w-4 h-4 ml-1" />
            </Link>
            <Link to="/admin/agents" className="px-5 py-2.5 bg-white text-[#244f3b] rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm border border-slate-100 transition-colors">
              View Agent Roster
            </Link>
         </div>
      </div>
    </div>
  );
}
