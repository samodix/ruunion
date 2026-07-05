import { redirect } from "next/navigation";
import { FilmForm } from "@/components/admin/forms/FilmForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function NewFilmPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-ru-muted mb-6 max-w-2xl">
        Renseignez les informations éditoriales, de visibilité et de collecte du
        film.
      </p>
      <FilmForm />
    </div>
  );
}
