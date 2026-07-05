import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="border-ru-border text-ru-primary-dark inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-extrabold shadow-sm">
      <span className="bg-ru-yellow size-2 rounded-full" />
      {children}
    </span>
  );
}
