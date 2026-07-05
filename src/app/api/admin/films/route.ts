import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createFilm, getFilmBySlug, getFilms } from "@/lib/admin-storage";
import { filmSchema } from "@/lib/validators";

async function authorized() {
  return isAdminAuthenticated();
}

export async function GET() {
  if (!(await authorized()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  try {
    return NextResponse.json({ success: true, data: await getFilms() });
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de lire les films." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await authorized()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  try {
    const parsed = filmSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Données invalides",
        },
        { status: 400 },
      );
    if (await getFilmBySlug(parsed.data.slug))
      return NextResponse.json(
        { success: false, message: "Ce slug existe déjà." },
        { status: 400 },
      );
    return NextResponse.json(
      { success: true, data: await createFilm(parsed.data) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de créer le film." },
      { status: 500 },
    );
  }
}
