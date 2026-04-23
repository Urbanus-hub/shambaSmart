import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, X } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Spinner } from "../components/Spinner";
import { EmptyState } from "../components/EmptyState";
import { Modal } from "../components/Modal";
import type { User } from "../types";
import { fetchAgents } from "../services/userService";
import { register } from "../services/authService";

export function AgentManagement() {
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Partial<User & { password?: string }> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const data = await fetchAgents();
      setAgents(data);
    } catch {
      toast.error("Failed to load agents");
    }
    setLoading(false);
  };

  const openCreateModal = () => {
    setEditingAgent({});
    setIsModalOpen(true);
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgent) return;
    setSaving(true);

    try {
      if (!editingAgent.id) {
        // Register new agent via auth/register
        await register(
          editingAgent.name!,
          editingAgent.email!,
          editingAgent.password || "changeme123",
          "AGENT",
        );
        toast.success("Agent registered successfully");
        await loadAgents();
      }
      setIsModalOpen(false);
      setEditingAgent(null);
    } catch {
      toast.error("Failed to save agent");
    }
    setSaving(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-up">
        <PageHeader title="Agent Roster" description="Manage field agents.">
          <button onClick={openCreateModal} className="btn-primary whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Agent
          </button>
        </PageHeader>

        {agents.length === 0 ? (
          <EmptyState
            title="No agents found"
            description="Register new agents to assign them to fields."
            action={{ label: "Add Agent", onClick: openCreateModal }}
          />
        ) : (
          <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Agent Name
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {agents.map((agent) => (
                    <tr
                      key={agent.id}
                      className="hover:bg-surface-muted transition-colors group"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                          {agent.name.charAt(0).toUpperCase()}
                        </div>
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {agent.employee_id || "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {agent.created_at
                          ? new Date(agent.created_at).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setEditingAgent(agent);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen && !!editingAgent}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAgent(null);
        }}
        title={editingAgent?.id ? "Edit Agent" : "Register New Agent"}
        description="Agent accounts use the AGENT role"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="agentForm"
              disabled={saving}
              className="btn-primary"
            >
              {saving
                ? "Saving..."
                : editingAgent?.id
                  ? "Save Changes"
                  : "Register Agent"}
            </button>
          </>
        }
      >
        <form id="agentForm" onSubmit={handleSaveAgent} className="space-y-4">
          <div>
            <label className="label-field">Full Name</label>
            <input
              required
              value={editingAgent?.name || ""}
              onChange={(e) =>
                setEditingAgent({ ...editingAgent, name: e.target.value })
              }
              placeholder="e.g. John Omondi"
              className="input-field"
            />
          </div>
          {!editingAgent?.id && (
            <>
              <div>
                <label className="label-field">Email</label>
                <input
                  type="email"
                  required
                  value={editingAgent?.email || ""}
                  onChange={(e) =>
                    setEditingAgent({ ...editingAgent, email: e.target.value })
                  }
                  placeholder="agent@shamba.io"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={editingAgent?.password || ""}
                  onChange={(e) =>
                    setEditingAgent({
                      ...editingAgent,
                      password: e.target.value,
                    })
                  }
                  placeholder="Minimum 6 characters"
                  className="input-field"
                />
              </div>
            </>
          )}
        </form>
      </Modal>
    </>
  );
}
