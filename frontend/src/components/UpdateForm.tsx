import { useState } from "react";

interface UpdateFormProps {
  onSubmit: (note: string) => Promise<void>;
}

export function UpdateForm({ onSubmit }: UpdateFormProps) {
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!note.trim()) {
      return;
    }

    setSubmitting(true);
    await onSubmit(note);
    setNote("");
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="font-display text-xl text-slate-900">Log field update</h3>
      <p className="mt-2 text-sm text-slate-600">
        Capture crop health, irrigation checks, pests, or harvest readiness.
      </p>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Share observations, pests, irrigation notes..."
        className="mt-4 min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-full bg-emerald-600 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save update"}
      </button>
    </form>
  );
}
