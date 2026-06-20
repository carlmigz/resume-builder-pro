import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full gradient-hero flex items-center justify-center p-0 md:p-6">
      <div className="relative w-full md:w-[420px] md:h-[860px] md:rounded-[2.5rem] md:border md:border-border md:shadow-card overflow-hidden bg-background flex flex-col">
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 h-7 w-40 bg-black/80 rounded-b-2xl z-20" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
