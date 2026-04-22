import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";
import { FieldCard } from "../components/FieldCard";
import type { Field } from "../types";
import { fetchFields } from "../services/fieldService";

let SAMPLE_FIELDS: Field[] = [
  { id: "101", name: "Plot Alpha (Mock)", crop_type: "Maize", planting_date: "2026-03-01", stage: "GROWING", assigned_agent_id: "1", status: "Active", image_url: "https://images.unsplash.com/photo-1601334857416-8c43cb8d2cd1?auto=format&fit=crop&q=80&w=600" },
  { id: "102", name: "Plot Beta (Mock)", crop_type: "Wheat", planting_date: "2026-02-15", stage: "READY", assigned_agent_id: "3", status: "Completed", image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600" },
  { id: "103", name: "Plot Gamma (Mock)", crop_type: "Beans", planting_date: "2026-04-01", stage: "PLANTED", assigned_agent_id: "1", status: "At Risk", image_url: "https://images.unsplash.com/photo-1589923188900-85dae5243404?auto=format&fit=crop&q=80&w=600" },
];

export function FieldManagement() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<Partial<Field> | null>(null);

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

  const handleSaveField = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingField?.id) {
      setFields(fields.map(f => f.id === editingField.id ? { ...f, ...editingField } as Field : f));
      toast.success("Field updated successfully");
    } else {
      const newField = { ...editingField, id: Math.random().toString() } as Field;
      setFields([newField, ...fields]);
      toast.success("New field registered");
    }
    setIsFieldModalOpen(false);
    setEditingField(null);
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    toast.error("Field removed from registry");
  };

  const filteredFields = fields.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.crop_type.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e0f6e9] border-t-[#36a783]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#36a783] font-bold">
            Database
          </p>
          <h2 className="mt-1 font-display text-4xl text-[#1e5545] tracking-tight">
            Field Management
          </h2>
        </div>
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search fields or crops..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-white"
            />
          </div>
          <button 
            onClick={() => { setEditingField({}); setIsFieldModalOpen(true); }}
            className="flex-none bg-[#244f3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#1a3d2d] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Field
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFields.map((field) => (
          <div key={field.id} className="relative group">
            <FieldCard field={field} />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
               <button 
                 onClick={(e) => { e.preventDefault(); setEditingField(field); setIsFieldModalOpen(true); }}
                 className="p-2.5 bg-white/95 backdrop-blur text-[#244f3b] hover:text-[#36a783] rounded-full shadow-md transition-colors hover:scale-105"
               >
                 <Edit2 className="w-4 h-4" />
               </button>
               <button 
                 onClick={(e) => { e.preventDefault(); handleDeleteField(field.id); }}
                 className="p-2.5 bg-white/95 backdrop-blur text-red-500 hover:text-red-600 rounded-full shadow-md transition-colors hover:scale-105"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {isFieldModalOpen && editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl text-[#1e5545]">{editingField.id ? "Edit Field" : "Register Field"}</h3>
              <button type="button" onClick={() => setIsFieldModalOpen(false)} className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"><X className="w-5 h-5"/></button>
            </div>
            
            <form onSubmit={handleSaveField} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Field Name</label>
                <input required value={editingField.name || ''} onChange={e => setEditingField({...editingField, name: e.target.value})} className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-slate-50 focus:bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Crop Type</label>
                  <input required value={editingField.crop_type || ''} onChange={e => setEditingField({...editingField, crop_type: e.target.value})} className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stage</label>
                  <select required value={editingField.stage || 'PLANTED'} onChange={e => setEditingField({...editingField, stage: e.target.value as any})} className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-slate-50 focus:bg-white">
                    <option value="PLANTED">Planted</option>
                    <option value="GROWING">Growing</option>
                    <option value="READY">Ready</option>
                    <option value="HARVESTED">Harvested</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select required value={editingField.status || 'Active'} onChange={e => setEditingField({...editingField, status: e.target.value as any})} className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-slate-50 focus:bg-white">
                    <option value="Active">Active</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Planting Date</label>
                  <input type="date" required value={editingField.planting_date || ''} onChange={e => setEditingField({...editingField, planting_date: e.target.value})} className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-slate-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URL (Optional)</label>
                <input value={editingField.image_url || ''} onChange={e => setEditingField({...editingField, image_url: e.target.value})} className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-slate-50 focus:bg-white" placeholder="https://..." />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-[#244f3b] text-white py-3.5 rounded-xl font-bold tracking-wide hover:bg-[#1a3d2d] shadow-md transition-colors">
                  {editingField.id ? "Save Settings" : "Complete Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
