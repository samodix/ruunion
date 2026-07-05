import type { LucideIcon } from "lucide-react";

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  accent = "teal",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: "teal" | "yellow" | "dark";
}) {
  const colors =
    accent === "yellow"
      ? "bg-ru-yellow/20 text-[#9a6500]"
      : accent === "dark"
        ? "bg-ru-ink/10 text-ru-ink"
        : "bg-ru-primary/15 text-ru-primary-dark";
  return (
    <div className="border-ru-border rounded-3xl border bg-white p-5 shadow-sm">
      <span className={`grid size-11 place-items-center rounded-2xl ${colors}`}>
        <Icon size={22} />
      </span>
      <p className="mt-5 text-3xl font-black">{value}</p>
      <p className="text-ru-muted mt-1 text-sm">{label}</p>
    </div>
  );
}
