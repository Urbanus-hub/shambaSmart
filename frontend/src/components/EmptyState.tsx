import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-surface rounded-xl border border-dashed border-slate-300">
      <Inbox className="w-10 h-10 text-slate-300 mb-4" />
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 text-center max-w-sm">
        {description}
      </p>
      {action && (
        <button onClick={action.onClick} className="btn-primary mt-4">
          {action.label}
        </button>
      )}
    </div>
  );
}
