import { redirect } from "next/navigation";
import { SupportPacksAdminList } from "@/components/admin/SupportPacksAdminList";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupportPacks } from "@/lib/admin-storage";

export const dynamic = "force-dynamic";

export default async function AdminSupportPacksPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-7xl">
      <SupportPacksAdminList initialPacks={await getSupportPacks()} />
    </div>
  );
}
