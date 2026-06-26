import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SubPage, Card, GroupLabel } from "@/components/SubPage";
import { auth } from "@/lib/auth-store";
import { Check, CreditCard, ChevronRight, Crown } from "lucide-react";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing & Plan — Resumely" }] }),
  component: BillingPage,
});

const plans = [
  { name: "Free", price: "$0", period: "/mo", features: ["1 resume", "Basic templates", "PDF export"], current: true },
  { name: "Pro", price: "$8", period: "/mo", features: ["Unlimited resumes", "Premium templates", "AI rewrites", "Priority support"], highlight: true },
  { name: "Team", price: "$24", period: "/mo", features: ["Everything in Pro", "5 seats", "Shared templates", "SSO"] },
];

function BillingPage() {
  const navigate = useNavigate();
  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);

  return (
    <SubPage title="Billing & plan" subtitle="Resumely">
      <div className="rounded-2xl p-4 border border-primary/30 bg-primary/5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center">
          <Crown className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">You're on Free</p>
          <p className="text-xs text-muted-foreground">Upgrade to unlock unlimited exports and AI.</p>
        </div>
      </div>

      <GroupLabel>Choose a plan</GroupLabel>
      <div className="space-y-3">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-2xl border p-4 ${p.highlight ? "border-primary/60 bg-primary/5" : "border-border bg-surface"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold flex items-center gap-2">
                  {p.name}
                  {p.current && <span className="text-[10px] uppercase tracking-wider text-success">Current</span>}
                  {p.highlight && <span className="text-[10px] uppercase tracking-wider text-primary">Popular</span>}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Billed monthly</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold">{p.price}</span>
                <span className="text-xs text-muted-foreground">{p.period}</span>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                  <Check className="h-3 w-3 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            {!p.current && (
              <button className={`mt-4 w-full h-10 rounded-xl text-sm font-semibold ${p.highlight ? "gradient-primary text-primary-foreground glow-primary" : "bg-secondary"}`}>
                {p.name === "Free" ? "Downgrade" : `Upgrade to ${p.name}`}
              </button>
            )}
          </div>
        ))}
      </div>

      <GroupLabel>Payment method</GroupLabel>
      <Card>
        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary transition">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm">Add payment method</p>
            <p className="text-xs text-muted-foreground mt-0.5">No card on file</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </Card>

      <GroupLabel>Billing history</GroupLabel>
      <Card>
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        </div>
      </Card>
    </SubPage>
  );
}
