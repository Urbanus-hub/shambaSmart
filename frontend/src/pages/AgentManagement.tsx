import { useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X } from "lucide-react";

let SAMPLE_AGENTS = [
  {
    id: "1",
    name: "Maria Kariuki",
    status: "Active",
    assignments: 12,
    region: "Rift Valley",
  },
  {
    id: "2",
    name: "John Omondi",
    status: "On Leave",
    assignments: 0,
    region: "Central",
  },
  {
    id: "3",
    name: "Sarah Wanjiku",
    status: "Active",
    assignments: 8,
    region: "Western",
  },
];

export function AgentManagement() {
  const [agents, setAgents] = useState([]);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any | null>(null);

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAgent?.id) {
      setAgents(
        agents?.map((a) =>
          a.id === editingAgent.id ? { ...a, ...editingAgent } : a,
        ),
      );
      toast.success("Agent profile updated");
    } else {
      const newAgent = {
        ...editingAgent,
        id: Math.random().toString(),
        assignments: 0,
      };
      setAgents([newAgent, ...agents]);
      toast.success("New agent provisioned");
    }
    setIsAgentModalOpen(false);
    setEditingAgent(null);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((a) => a.id !== id));
    toast.error("Agent access revoked");
  };

  return (
    <>
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#36a783] font-bold">
              Personnel
            </p>
            <h2 className="mt-1 font-display text-4xl text-[#1e5545] tracking-tight">
              Agent Roster
            </h2>
          </div>
          <button
            onClick={() => {
              setEditingAgent({});
              setIsAgentModalOpen(true);
            }}
            className="bg-[#244f3b] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#1a3d2d] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Agent
          </button>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Agent Name</th>
                  <th className="pb-3 font-bold">Region</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-center">Assignments</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {agents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="hover:bg-[#f2fbf5] group transition-colors"
                  >
                    <td className="py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e0f6e9] text-[#1e5545] flex items-center justify-center font-display">
                        {agent.name.charAt(0)}
                      </div>
                      {agent.name}
                    </td>
                    <td className="py-4 text-slate-600">{agent.region}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${
                          agent.status === "Active"
                            ? "bg-[#c2ecd6] text-[#1a463a]"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="py-4 text-center font-medium">
                      {agent.assignments}
                    </td>
                    <td className="py-4 text-right flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingAgent(agent);
                          setIsAgentModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-[#36a783] bg-white rounded-md border border-slate-100 shadow-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="p-2 text-slate-400 hover:text-red-500 bg-white rounded-md border border-slate-100 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Agent Modal */}
      {isAgentModalOpen && editingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl text-[#1e5545]">
                {editingAgent.id ? "Edit Agent" : "Add Agent"}
              </h3>
              <button
                onClick={() => setIsAgentModalOpen(false)}
                className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAgent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  required
                  value={editingAgent.name || ""}
                  onChange={(e) =>
                    setEditingAgent({ ...editingAgent, name: e.target.value })
                  }
                  className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Region
                </label>
                <input
                  required
                  value={editingAgent.region || ""}
                  onChange={(e) =>
                    setEditingAgent({ ...editingAgent, region: e.target.value })
                  }
                  className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Status
                </label>
                <select
                  required
                  value={editingAgent.status || "Active"}
                  onChange={(e) =>
                    setEditingAgent({ ...editingAgent, status: e.target.value })
                  }
                  className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#36a783] focus:ring-4 focus:ring-[#e0f6e9] transition-all bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mt-8 flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#244f3b] text-white py-3.5 rounded-xl font-bold tracking-wide hover:bg-[#1a3d2d] transition-colors shadow-md"
                >
                  {editingAgent.id ? "Save Changes" : "Provision Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
