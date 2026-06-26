import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubPage } from "@/components/SubPage";
import { auth, useAuth } from "@/lib/auth-store";
import { useResume } from "@/lib/resume-store";
import { Check } from "lucide-react";

export const Route = createFileRoute("/personal-info")({
  head: () => ({ meta: [{ title: "Personal information — Resumely" }] }),
  component: PersonalInfoPage,
});

function PersonalInfoPage() {
  const navigate = useNavigate();
  const user = useAuth();
  const [resume, update] = useResume();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const save = () => {
    auth.signIn({ ...user, name: resume.fullName || user.name, email: resume.email || user.email, title: resume.title });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <SubPage title="Personal information" subtitle="Account">
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <Input label="Full name" value={resume.fullName} onChange={(v) => update({ fullName: v })} />
        <Input label="Job title" value={resume.title} onChange={(v) => update({ title: v })} />
        <Input label="Email" type="email" value={resume.email} onChange={(v) => update({ email: v })} />
        <Input label="Phone" value={resume.phone} onChange={(v) => update({ phone: v })} />
        <Input label="Location" value={resume.location} onChange={(v) => update({ location: v })} />
        <Input label="Website / LinkedIn" value={resume.website} onChange={(v) => update({ website: v })} />
      </div>
      <button onClick={save} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 glow-primary">
        {saved ? <><Check className="h-4 w-4" /> Saved</> : "Save changes"}
      </button>
    </SubPage>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground">{label}</label>
      <input
        type={type} value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 200))}
        className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary/60"
      />
    </div>
  );
}
