import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-ru-border rounded-3xl border bg-white p-6 shadow-[0_18px_55px_rgba(51,54,58,0.07)]",
        className,
      )}
      {...props}
    />
  );
}
