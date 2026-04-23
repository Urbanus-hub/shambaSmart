import { useState } from "react";
import type { FieldStage } from "../types";

interface UpdateFormProps {
  onSubmit: (note: string, stage: FieldStage) => Promise<void>;
  currentStage?: FieldStage;
}

export function UpdateForm({
  onSubmit,
  currentStage = "PLANTED",
}: UpdateFormProps) {
  const [note, setNote] = useState("");
  const [stage, setStage] = useState<FieldStage>(currentStage);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!note.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(note, stage);
      setNote("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Log field update
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Record observations about crop health, irrigation, or pests.
        </p>
      </div>

      <div>
        <label className="label-field">Field Stage</label>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as FieldStage)}
          className="input-field"
        >
          <option value="PLANTED">Planted</option>
          <option value="GROWING">Growing</option>
          <option value="READY">Ready</option>
          <option value="HARVESTED">Harvested</option>
        </select>
      </div>

      <div>
        <label className="label-field">Observation Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Share observations, pests, irrigation notes..."
          rows={4}
          className="input-field resize-y"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => setNote("")}
          className="btn-secondary"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={submitting || !note.trim()}
          className="btn-primary"
        >
          {submitting ? "Saving..." : "Save update"}
        </button>
      </div>
    </form>
  );
}
