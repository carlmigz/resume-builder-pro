import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubPage, Card } from "@/components/SubPage";
import { auth } from "@/lib/auth-store";
import { exports_, type ExportRecord } from "@/lib/resume-store";
import { FileText, Trash2 } from "lucide-react";

export const Route = createFileRoute("/export-history")({
  head: () => ({ meta: [{ title: "Export history — Resumely" }] }),
  component: ExportHistoryPage,
});

function ExportHistoryPage() {
  const navigate = useNavigate();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);
  const [list, setList] = useState<ExportRecord[]>([]);
  useEffect(() => { setList(exports_.list()); }, []);

  const clear = () => { exports_.clear(); setList([]); };

  return (
    <SubPage title="Export history" subtitle="Resumely">
      {list.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <div className="h-12 w-12 rounded-2xl bg-secondary grid place-items-center mx-auto">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium mt-3">No exports yet</p>
          <p className="text-xs text-muted-foreground mt-1">Your downloaded resumes will appear here.</p>
          <Link to="/preview" className="inline-block mt-4 h-10 px-4 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold leading-10 glow-primary">
            Export a resume
          </Link>
        </div>
      ) : (
        <>
          <Card>
            {list.map((rec) => (
              <div key={rec.id} className="flex items-center gap-3 px-4 py-3.5">
                <div className="h-10 w-10 rounded-lg bg-secondary grid place-items-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{rec.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rec.format} · {new Date(rec.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </Card>
          <button onClick={clear} className="w-full h-11 rounded-xl border border-destructive/40 text-destructive text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" /> Clear history
          </button>
        </>
      )}
    </SubPage>
  );
}
