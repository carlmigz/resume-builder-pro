import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubPage, Card, GroupLabel } from "@/components/SubPage";
import { auth } from "@/lib/auth-store";
import { ChevronRight, Shield, Lock, Eye, Smartphone, Download, Trash2 } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy & Security — Resumely" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const navigate = useNavigate();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);
  const [twoFA, setTwoFA] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <SubPage title="Privacy & security" subtitle="Account">
      <div className="space-y-2">
        <GroupLabel>Security</GroupLabel>
        <Card>
          <Tappable Icon={Lock} title="Change password" desc="Last changed 3 months ago" />
          <Toggle Icon={Shield} title="Two-factor authentication" desc="Add an extra step at sign in." on={twoFA} onChange={() => setTwoFA(!twoFA)} />
          <Tappable Icon={Smartphone} title="Active sessions" desc="2 devices signed in" />
        </Card>
      </div>

      <div className="space-y-2">
        <GroupLabel>Privacy</GroupLabel>
        <Card>
          <Toggle Icon={Eye} title="Public resume profile" desc="Allow recruiters to discover you." on={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
          <Toggle Icon={Shield} title="Anonymous analytics" desc="Help us improve the app." on={analytics} onChange={() => setAnalytics(!analytics)} />
        </Card>
      </div>

      <div className="space-y-2">
        <GroupLabel>Your data</GroupLabel>
        <Card>
          <Tappable Icon={Download} title="Download my data" desc="Get a copy of your resume data." />
          <Tappable Icon={Trash2} title="Delete account" desc="Permanently remove your account." danger />
        </Card>
      </div>

      <p className="text-[11px] text-muted-foreground text-center pt-2">
        We never sell your data. Read our{" "}
        <span className="text-primary underline">Privacy policy</span>.
      </p>
    </SubPage>
  );
}

function Tappable({ Icon, title, desc, danger }: { Icon: React.ComponentType<{ className?: string }>; title: string; desc?: string; danger?: boolean }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary transition">
      <Icon className={`h-4 w-4 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${danger ? "text-destructive" : ""}`}>{title}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function Toggle({ Icon, title, desc, on, onChange }: { Icon: React.ComponentType<{ className?: string }>; title: string; desc?: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">{title}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${on ? "gradient-primary" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}
