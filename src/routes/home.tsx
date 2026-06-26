import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { auth, useAuth } from "@/lib/auth-store";
import {
  Plus, FileText, Briefcase, GraduationCap, Star, Sparkles, ChevronRight, Download,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Builder — Resumely" },
      { name: "description", content: "Craft and polish your resume sections." },
    ],
  }),
  component: HomePage,
});

const sections = [
  { id: "personal", label: "Personal info", Icon: Star, progress: 100 },
  { id: "experience", label: "Work experience", Icon: Briefcase, progress: 70 },
  { id: "education", label: "Education", Icon: GraduationCap, progress: 40 },
  { id: "skills", label: "Skills & tools", Icon: Sparkles, progress: 20 },
];

function HomePage() {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (!auth.get()) navigate({ to: "/" });
  }, [navigate]);

  if (!user) return null;
  const overall = Math.round(sections.reduce((s, x) => s + x.progress, 0) / sections.length);

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-6 pt-10 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-muted-foreground">Welcome back</p>
              <h1 className="text-2xl font-semibold mt-0.5">{user.name.split(" ")[0]} 👋</h1>
            </div>
            <Link to="/editor" className="h-11 w-11 rounded-full gradient-primary grid place-items-center glow-primary">
              <Plus className="h-5 w-5 text-primary-foreground" />
            </Link>
          </div>

          {/* Active resume card */}
          <div className="gradient-card rounded-2xl p-5 border border-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-medium">Current resume</p>
                <h2 className="text-lg font-semibold mt-1">Senior Product Designer</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Updated 2 hours ago</p>
              </div>
              <div className="relative h-14 w-14">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15" fill="none"
                    stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${(overall / 100) * 94.25} 94.25`}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-xs font-semibold">{overall}%</span>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <Link to="/editor" className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition grid place-items-center">
                Continue editing
              </Link>
              <Link to="/preview" className="h-10 w-10 rounded-xl bg-secondary grid place-items-center hover:bg-muted transition">
                <Download className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sections */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Sections</h3>
              <span className="text-xs text-muted-foreground">{sections.length} total</span>
            </div>
            <ul className="space-y-2">
              {sections.map(({ id, label, Icon, progress }) => (
                <li key={id}>
                  <Link to="/editor" className="w-full flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-primary/40 transition-colors text-left">
                    <div className="h-10 w-10 rounded-lg bg-secondary grid place-items-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{label}</p>
                      <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full gradient-primary" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI suggestion */}
          <div className="mt-6 p-4 rounded-2xl border border-primary/30 bg-primary/5">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center shrink-0">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">AI suggestion</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Add 2 measurable outcomes to your latest role to boost recruiter response rate by ~38%.
                </p>
                <button className="mt-3 text-xs font-semibold text-primary inline-flex items-center gap-1">
                  Apply suggestion <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="mt-8 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Templates</h3>
              <button className="text-xs text-primary font-medium">See all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto -mx-6 px-6 pb-2 snap-x">
              {["Modern", "Classic", "Bold", "Minimal"].map((t, i) => (
                <div key={t} className="snap-start shrink-0 w-32">
                  <div className={`aspect-[3/4] rounded-xl border border-border ${i === 0 ? "ring-2 ring-primary" : ""} bg-surface-elevated p-3 flex flex-col gap-1.5`}>
                    <div className="h-2 rounded-full bg-foreground/80 w-1/2" />
                    <div className="h-1.5 rounded-full bg-muted-foreground/40 w-3/4" />
                    <div className="h-1.5 rounded-full bg-muted-foreground/40 w-2/3" />
                    <div className="mt-2 h-1 rounded bg-muted-foreground/20" />
                    <div className="h-1 rounded bg-muted-foreground/20 w-5/6" />
                    <div className="h-1 rounded bg-muted-foreground/20 w-4/6" />
                    <div className="mt-auto flex gap-1">
                      <div className="h-1.5 w-6 rounded-full gradient-primary" />
                      <div className="h-1.5 w-3 rounded-full bg-muted-foreground/30" />
                    </div>
                  </div>
                  <p className="text-xs mt-2 font-medium text-center">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
