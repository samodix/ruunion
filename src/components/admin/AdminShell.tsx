"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;
  return (
    <div className="bg-ru-soft min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">
        <AdminHeader />
        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
