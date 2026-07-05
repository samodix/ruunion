import Link from "next/link";
import { Inbox } from "lucide-react";

export function AdminEmptyState({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="border-ru-border rounded-3xl border border-dashed bg-white px-6 py-14 text-center">
      <Inbox className="text-ru-primary-dark mx-auto" size={38} />
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="text-ru-muted mt-2">{description}</p>
      <Link
        className="bg-ru-primary-dark mt-6 inline-flex rounded-full px-5 py-3 text-sm font-bold text-white"
        href={href}
      >
        {action}
      </Link>
    </div>
  );
}
