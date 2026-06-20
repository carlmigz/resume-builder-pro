import { Github, Apple } from "lucide-react";
import { auth } from "@/lib/auth-store";
import { useNavigate } from "@tanstack/react-router";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29 4.5 24 4.5 16.3 4.5 9.6 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 12.9-5l-6-4.9c-2 1.5-4.4 2.4-6.9 2.4-5.3 0-9.7-3-11.3-7.4l-6.5 5C9.4 39 16.1 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6 4.9c-.4.4 6.5-4.7 6.5-14.5 0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

export function SocialButtons() {
  const navigate = useNavigate();
  const mock = (provider: string) => {
    auth.signIn({
      name: provider === "Google" ? "Alex Carter" : provider === "Apple" ? "Jamie Lee" : "Sam Rivera",
      email: `${provider.toLowerCase()}.user@resumely.app`,
      title: "Product Designer",
    });
    navigate({ to: "/home" });
  };
  const base =
    "flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-border bg-surface-elevated hover:bg-secondary transition-colors text-sm font-medium";
  return (
    <div className="space-y-3">
      <button type="button" onClick={() => mock("Google")} className={base}>
        <GoogleIcon /> Continue with Google
      </button>
      <button type="button" onClick={() => mock("Apple")} className={base}>
        <Apple className="h-5 w-5" /> Continue with Apple
      </button>
      <button type="button" onClick={() => mock("GitHub")} className={base}>
        <Github className="h-5 w-5" /> Continue with GitHub
      </button>
    </div>
  );
}
