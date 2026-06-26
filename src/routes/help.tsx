import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubPage, Card, GroupLabel } from "@/components/SubPage";
import { auth } from "@/lib/auth-store";
import { ChevronDown, ChevronRight, MessageCircle, Mail, BookOpen, Search } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help center — Resumely" }] }),
  component: HelpPage,
});

const faqs = [
  { q: "How do I export my resume to PDF?", a: "Open your resume, tap Preview, then Export PDF. Your browser will open a print dialog where you can choose 'Save as PDF'." },
  { q: "Are my changes saved automatically?", a: "Yes. Every change you make in the editor is autosaved to your device. You can leave and resume anytime." },
  { q: "Can I have multiple resumes?", a: "On the Free plan you can have one resume. Upgrade to Pro for unlimited resumes." },
  { q: "How does the AI suggestion work?", a: "Resumely analyzes your content and suggests stronger phrasing, missing details, and measurable outcomes recruiters care about." },
  { q: "How do I cancel my subscription?", a: "Go to Profile → Billing & plan and choose Downgrade. Your access continues until the end of the billing cycle." },
  { q: "Is my data private?", a: "Yes. Your resume data is stored on your device. We never sell your data." },
];

function HelpPage() {
  const navigate = useNavigate();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string>("");

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));

  return (
    <SubPage title="Help center" subtitle="Resumely">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help articles…"
          className="w-full rounded-xl bg-input border border-border pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary/60"
        />
      </div>

      <GroupLabel>Get in touch</GroupLabel>
      <div className="grid grid-cols-3 gap-2">
        <Tile Icon={MessageCircle} label="Live chat" />
        <Tile Icon={Mail} label="Email us" />
        <Tile Icon={BookOpen} label="Guides" />
      </div>

      <GroupLabel>Frequently asked</GroupLabel>
      <Card>
        {filtered.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">No results.</div>
        ) : filtered.map((f) => {
          const isOpen = open === f.q;
          return (
            <div key={f.q}>
              <button onClick={() => setOpen(isOpen ? "" : f.q)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary transition">
                <p className="text-sm flex-1">{f.q}</p>
                {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed">{f.a}</div>
              )}
            </div>
          );
        })}
      </Card>

      <p className="text-[11px] text-muted-foreground text-center pt-2">
        Can't find what you need? Email <span className="text-primary">support@resumely.app</span>
      </p>
    </SubPage>
  );
}

function Tile({ Icon, label }: { Icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="rounded-2xl border border-border bg-surface p-4 flex flex-col items-center gap-2 hover:border-primary/40 transition">
      <div className="h-9 w-9 rounded-lg bg-secondary grid place-items-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-[11px]">{label}</span>
    </button>
  );
}
