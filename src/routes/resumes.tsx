import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { auth } from "@/lib/auth-store";
import { FileText, MoreVertical, Plus } from "lucide-react";

export const Route = createFileRoute("/resumes")({
  head: () => ({
    meta: [{ title: "Resumes — Resumely" }],
  }),
  component: ResumesPage,
});

const resumes = [
  { title: "Senior Product Designer", updated: "2h ago", tag: "Active" },
  { title: "UX Researcher — FinTech", updated: "Yesterday", tag: "Draft" },
  { title: "Design Lead — Series B", updated: "3 days ago", tag: "Sent" },
];

function ResumesPage() {
  const navigate = useNavigate();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-6 pt-10 pb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">My resumes</h1>
            <button className="h-10 w-10 rounded-full gradient-primary grid place-items-center glow-primary">
              <Plus className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <ul className="space-y-3">
            {resumes.map((r) => (
              <li key={r.title} className="p-4 rounded-2xl border border-border bg-surface flex items-center gap-3">
                <div className="h-12 w-10 rounded-md gradient-card border border-border grid place-items-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
                      {r.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{r.updated}</span>
                  </div>
                </div>
                <button className="h-8 w-8 grid place-items-center text-muted-foreground hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
