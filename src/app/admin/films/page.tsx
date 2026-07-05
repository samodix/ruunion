import { redirect } from "next/navigation";
import { FilmsAdminList } from "@/components/admin/FilmsAdminList";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getFilms } from "@/lib/admin-storage";

export const dynamic = "force-dynamic";

export default async function AdminFilmsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-7xl">
      <FilmsAdminList initialFilms={await getFilms()} />
    </div>
  );
}
