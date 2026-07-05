import { notFound, redirect } from "next/navigation";
import { FilmForm } from "@/components/admin/forms/FilmForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getFilmById } from "@/lib/admin-storage";

export const dynamic = "force-dynamic";

export default async function EditFilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const film = await getFilmById((await params).id);
  if (!film) notFound();
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-ru-muted mb-6">
        Modifiez le film « {film.title} » puis enregistrez.
      </p>
      <FilmForm film={film} />
    </div>
  );
}
