import { cn } from "@/lib/utils";

export function AdminBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "success" | "warning" | "neutral" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-extrabold",
        tone === "success" && "bg-ru-primary/15 text-ru-primary-dark",
        tone === "warning" && "bg-ru-yellow/20 text-[#8a5d00]",
        tone === "neutral" && "bg-ru-border/70 text-ru-muted",
        tone === "dark" && "bg-ru-ink text-white",
      )}
    >
      {children}
    </span>
  );
}
