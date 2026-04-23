import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";
import { FieldCard } from "../components/FieldCard";
import { PageHeader } from "../components/PageHeader";
import { Spinner } from "../components/Spinner";
import { EmptyState } from "../components/EmptyState";
import { Modal } from "../components/Modal";
import type { Field, FieldStage, User } from "../types";
import { fetchFields, createField, updateField } from "../services/fieldService";
import { fetchAgents } from "../services/userService";
import { useAuth } from "../hooks/useAuth";

export function FieldManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [fields, setFields] = useState<Field[]>([]);
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<Partial<Field> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [fieldsData, agentsData] = await Promise.all([
          fetchFields(),
          isAdmin ? fetchAgents() : Promise.resolve([]),
        ]);
        setFields(fieldsData);
        setAgents(agentsData);
      } catch {
        toast.error("Failed to load data");
      }
      setLoading(false);
    };
    load();
  }, [isAdmin]);

  const openCreateModal = () => {
    setEditingField({ stage: "PLANTED" as FieldStage });
    setIsModalOpen(true);
  };

  const handleSaveField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField) return;
    setSaving(true);

    try {
      if (editingField.id) {
        const updated = await updateField(editingField.id, {
          name: editingField.name,
          crop_type: editingField.crop_type,
          planting_date: editingField.planting_date,
          growth_duration_days: editingField.growth_duration_days,
          stage: editingField.stage,
          assigned_agent_id: editingField.assigned_agent_id || null,
        });
        setFields((prev) =>
          prev.map((f) => (f.id === updated.id ? { ...f, ...updated } : f)),
        );
        toast.success("Field updated successfully");
      } else {
        const created = await createField({
          name: editingField.name!,
          crop_type: editingField.crop_type!,
          planting_date: editingField.planting_date!,
          growth_duration_days: editingField.growth_duration_days!,
          stage: (editingField.stage as FieldStage) || "PLANTED",
          assigned_agent_id: editingField.assigned_agent_id || null,
        });
        setFields((prev) => [created, ...prev]);
        toast.success("Field created successfully");
      }
      setIsModalOpen(false);
      setEditingField(null);
    } catch {
      toast.error("Failed to save field");
    }
    setSaving(false);
  };

  const filteredFields = fields.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.crop_type.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Spinner />;

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-up">
        <PageHeader
          title="Fields"
          description="Manage and track your agricultural operations."
        >
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by field or crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          {isAdmin && (
            <button onClick={openCreateModal} className="btn-primary whitespace-nowrap">
              <Plus className="w-4 h-4" /> New Field
            </button>
          )}
        </PageHeader>

        {filteredFields.length === 0 ? (
          <EmptyState
            title="No fields found"
            description="Get started by creating a new field."
            action={
              isAdmin ? { label: "Create Field", onClick: openCreateModal } : undefined
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen && !!editingField}
        onClose={() => {
          setIsModalOpen(false);
          setEditingField(null);
        }}
        title={editingField?.id ? "Edit Field" : "Create New Field"}
        description="Enter details for agricultural tracking"
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
              form="fieldForm"
              disabled={saving}
              className="btn-primary"
            >
              {saving
                ? "Saving..."
                : editingField?.id
                  ? "Save Changes"
                  : "Create Field"}
            </button>
          </>
        }
      >
        <form id="fieldForm" onSubmit={handleSaveField} className="space-y-4">
          <div>
            <label className="label-field">Field Name</label>
            <input
              required
              value={editingField?.name || ""}
              onChange={(e) =>
                setEditingField({ ...editingField, name: e.target.value })
              }
              placeholder="e.g. North Plot 01"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Crop Type</label>
              <input
                required
                value={editingField?.crop_type || ""}
                onChange={(e) =>
                  setEditingField({ ...editingField, crop_type: e.target.value })
                }
                placeholder="e.g. Maize"
                className="input-field"
              />
            </div>
            <div>
              <label className="label-field">Growth Duration</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="1"
                  value={editingField?.growth_duration_days || ""}
                  onChange={(e) =>
                    setEditingField({
                      ...editingField,
                      growth_duration_days: Number(e.target.value),
                    })
                  }
                  placeholder="90"
                  className="input-field pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">
                  days
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Planting Date</label>
              <input
                type="date"
                required
                value={editingField?.planting_date || ""}
                onChange={(e) =>
                  setEditingField({
                    ...editingField,
                    planting_date: e.target.value,
                  })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="label-field">Assigned Agent</label>
              <select
                value={editingField?.assigned_agent_id || ""}
                onChange={(e) =>
                  setEditingField({
                    ...editingField,
                    assigned_agent_id: e.target.value || null,
                  })
                }
                className="input-field"
              >
                <option value="">Unassigned</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                    {agent.employee_id ? ` (${agent.employee_id})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
