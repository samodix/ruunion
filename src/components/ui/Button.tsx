import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: Props) {
  const styles = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold transition focus-visible:outline-3",
    variant === "primary" &&
      "bg-ru-primary-dark text-white shadow-lg shadow-ru-primary/20 hover:-translate-y-0.5",
    variant === "secondary" &&
      "border border-ru-primary-dark bg-white text-ru-primary-dark hover:bg-ru-soft",
    variant === "dark" && "bg-ru-ink text-white hover:bg-black",
    className,
  );
  if (href)
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
