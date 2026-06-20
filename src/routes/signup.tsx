import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SocialButtons } from "@/components/SocialButtons";
import { auth } from "@/lib/auth-store";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Resumely account" },
      { name: "description", content: "Join Resumely and ship a polished resume in minutes." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    auth.signIn({ name, email, title: "Aspiring Professional" });
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col px-6 pt-8 pb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex items-center gap-2 mt-6 mb-8">
          <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center glow-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-display font-semibold tracking-tight">Resumely</span>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Start your resume in under a minute.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Full name" value={name} onChange={setName} placeholder="Jordan Avery" />
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" />

          <button
            type="submit"
            className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm glow-primary hover:opacity-95 transition-opacity"
          >
            Create account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground">or sign up with</span>
          <div className="h-px bg-border flex-1" />
        </div>

        <SocialButtons />

        <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </PhoneFrame>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full h-12 rounded-xl bg-input border border-border px-4 text-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
