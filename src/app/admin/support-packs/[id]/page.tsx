import { notFound, redirect } from "next/navigation";
import { SupportPackForm } from "@/components/admin/forms/SupportPackForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupportPackById } from "@/lib/admin-storage";

export const dynamic = "force-dynamic";

export default async function EditSupportPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const pack = await getSupportPackById((await params).id);
  if (!pack) notFound();
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-ru-muted mb-6">
        Modifiez le pack « {pack.title} » puis enregistrez.
      </p>
      <SupportPackForm pack={pack} />
    </div>
  );
}
