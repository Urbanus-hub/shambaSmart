import { Loader2 } from "lucide-react";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <Loader2 className="w-7 h-7 text-brand-500 animate-spin" />
    </div>
  );
}
