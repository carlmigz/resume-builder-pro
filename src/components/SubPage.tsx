import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

export function SubPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full">
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">
          <div className="px-5 pt-6 pb-3 flex items-center gap-3">
            <Link to="/profile" className="h-9 w-9 rounded-full bg-secondary grid place-items-center hover:bg-muted transition">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex-1 min-w-0">
              {subtitle && <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{subtitle}</p>}
              <h1 className="text-base font-semibold truncate">{title}</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 px-5 py-5 space-y-4">{children}</div>
      </div>
    </PhoneFrame>
  );
}

export function Row({ label, value, action }: { label: string; value?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm">{label}</p>
        {value && <p className="text-xs text-muted-foreground mt-0.5 truncate">{value}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-border bg-surface overflow-hidden divide-y divide-border">{children}</div>;
}

export function GroupLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs uppercase tracking-wider text-muted-foreground px-1">{children}</p>;
}
