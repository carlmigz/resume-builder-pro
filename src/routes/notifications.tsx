import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubPage, Card, GroupLabel } from "@/components/SubPage";
import { auth } from "@/lib/auth-store";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Resumely" }] }),
  component: NotificationsPage,
});

const KEY = "resumely.notifications";
type Prefs = Record<string, boolean>;
const defaults: Prefs = {
  resumeTips: true, weeklyDigest: true, jobMatches: true, aiSuggestions: true,
  productUpdates: false, marketing: false, push: true, email: true,
};

function NotificationsPage() {
  const navigate = useNavigate();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);

  const [prefs, setPrefs] = useState<Prefs>(() => {
    if (typeof window === "undefined") return defaults;
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return defaults; }
  });
  const toggle = (k: string) => {
    const next = { ...prefs, [k]: !prefs[k] };
    setPrefs(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const groups: { label: string; items: { key: string; title: string; desc: string }[] }[] = [
    { label: "Activity", items: [
      { key: "resumeTips", title: "Resume tips", desc: "Personalized tips to improve your resume." },
      { key: "weeklyDigest", title: "Weekly digest", desc: "A summary of your progress and stats." },
      { key: "jobMatches", title: "Job matches", desc: "Roles that match your profile." },
      { key: "aiSuggestions", title: "AI suggestions", desc: "Smart rewrites and recommendations." },
    ]},
    { label: "Updates", items: [
      { key: "productUpdates", title: "Product updates", desc: "New features and improvements." },
      { key: "marketing", title: "Promotions", desc: "Occasional discounts and offers." },
    ]},
    { label: "Channels", items: [
      { key: "push", title: "Push notifications", desc: "Alerts on this device." },
      { key: "email", title: "Email", desc: "Send to your account email." },
    ]},
  ];

  return (
    <SubPage title="Notifications" subtitle="Account">
      {groups.map((g) => (
        <div key={g.label} className="space-y-2">
          <GroupLabel>{g.label}</GroupLabel>
          <Card>
            {g.items.map((it) => (
              <div key={it.key} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm">{it.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{it.desc}</p>
                </div>
                <Switch on={!!prefs[it.key]} onChange={() => toggle(it.key)} />
              </div>
            ))}
          </Card>
        </div>
      ))}
    </SubPage>
  );
}

function Switch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${on ? "gradient-primary" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}
