import { Link, useLocation } from "@tanstack/react-router";
import { Home, User, FileText } from "lucide-react";

const items = [
  { to: "/home", label: "Builder", Icon: Home },
  { to: "/resumes", label: "Resumes", Icon: FileText },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 border-t border-border bg-surface/95 backdrop-blur-xl pb-safe">
      <ul className="grid grid-cols-3">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                <span className={active ? "font-medium" : ""}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
