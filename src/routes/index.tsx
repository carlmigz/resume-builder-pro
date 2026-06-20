import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SocialButtons } from "@/components/SocialButtons";
import { auth } from "@/lib/auth-store";
import { Eye, EyeOff, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resumely — Build a standout resume in minutes" },
      { name: "description", content: "Resumely is the mobile resume builder that turns your story into an interview-ready CV." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (auth.get()) navigate({ to: "/home" });
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    auth.signIn({ name: email.split("@")[0], email, title: "Product Designer" });
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="min-h-full flex flex-col px-6 pt-12 pb-8">
        <div className="flex items-center gap-2 mb-10">
          <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center glow-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-display font-semibold tracking-tight">Resumely</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in to keep crafting your story.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full h-12 rounded-xl bg-input border border-border px-4 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="relative mt-1.5">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-xl bg-input border border-border px-4 pr-12 text-sm outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm glow-primary hover:opacity-95 transition-opacity"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px bg-border flex-1" />
        </div>

        <SocialButtons />

        <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </PhoneFrame>
  );
}
