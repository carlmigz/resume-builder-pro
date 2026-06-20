import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { auth, useAuth } from "@/lib/auth-store";
import {
  Bell, ChevronRight, CreditCard, Crown, HelpCircle, LogOut, Settings, Shield, FileText,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Profile — Resumely" }],
  }),
  component: ProfilePage,
});

const groups = [
  {
    label: "Account",
    items: [
      { label: "Personal information", Icon: Settings },
      { label: "Notifications", Icon: Bell },
      { label: "Privacy & security", Icon: Shield },
    ],
  },
  {
    label: "Resumely",
    items: [
      { label: "Billing & plan", Icon: CreditCard },
      { label: "Export history", Icon: FileText },
      { label: "Help center", Icon: HelpCircle },
    ],
  },
];

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuth();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);
  if (!user) return null;

  const initials = user.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-6 pt-10 pb-6">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>

          <div className="gradient-card rounded-2xl p-5 border border-border shadow-card flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl gradient-primary grid place-items-center text-xl font-display font-semibold text-primary-foreground glow-primary">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              <p className="text-xs mt-1 text-primary">{user.title}</p>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-2xl border border-primary/30 bg-primary/5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center">
              <Crown className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Upgrade to Pro</p>
              <p className="text-xs text-muted-foreground">Unlimited resumes, AI rewrites, exports.</p>
            </div>
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
              Upgrade
            </button>
          </div>

          {groups.map((g) => (
            <div key={g.label} className="mt-7">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-1">{g.label}</p>
              <ul className="rounded-2xl border border-border bg-surface overflow-hidden divide-y divide-border">
                {g.items.map(({ label, Icon }) => (
                  <li key={label}>
                    <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary transition-colors text-left">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <button
            onClick={() => { auth.signOut(); navigate({ to: "/" }); }}
            className="mt-8 w-full h-12 rounded-xl border border-destructive/40 text-destructive font-medium text-sm flex items-center justify-center gap-2 hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">Resumely v1.0 · Made with ✦</p>
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
