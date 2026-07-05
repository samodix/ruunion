import { redirect } from "next/navigation";
import { SupportPackForm } from "@/components/admin/forms/SupportPackForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function NewSupportPackPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-ru-muted mb-6 max-w-2xl">
        Créez une offre de soutien locale. Aucun paiement réel ne sera
        déclenché.
      </p>
      <SupportPackForm />
    </div>
  );
}
