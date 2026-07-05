import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deleteFilm,
  getFilmById,
  getFilmBySlug,
  updateFilm,
} from "@/lib/admin-storage";
import { filmSchema } from "@/lib/validators";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  const film = await getFilmById((await params).id);
  return film
    ? NextResponse.json({ success: true, data: film })
    : NextResponse.json(
        { success: false, message: "Film introuvable." },
        { status: 404 },
      );
}

export async function PUT(request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  try {
    const { id } = await params;
    const parsed = filmSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Données invalides",
        },
        { status: 400 },
      );
    const sameSlug = await getFilmBySlug(parsed.data.slug);
    if (sameSlug && sameSlug.id !== id)
      return NextResponse.json(
        { success: false, message: "Ce slug existe déjà." },
        { status: 400 },
      );
    const film = await updateFilm(id, parsed.data);
    return film
      ? NextResponse.json({ success: true, data: film })
      : NextResponse.json(
          { success: false, message: "Film introuvable." },
          { status: 404 },
        );
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de modifier le film." },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Context) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  try {
    return (await deleteFilm((await params).id))
      ? NextResponse.json({ success: true })
      : NextResponse.json(
          { success: false, message: "Film introuvable." },
          { status: 404 },
        );
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de supprimer le film." },
      { status: 500 },
    );
  }
}
