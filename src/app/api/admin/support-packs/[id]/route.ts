import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deleteSupportPack,
  getSupportPackById,
  getSupportPackBySlug,
  updateSupportPack,
} from "@/lib/admin-storage";
import { supportPackSchema } from "@/lib/validators";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  const pack = await getSupportPackById((await params).id);
  return pack
    ? NextResponse.json({ success: true, data: pack })
    : NextResponse.json(
        { success: false, message: "Pack introuvable." },
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
    const parsed = supportPackSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Données invalides",
        },
        { status: 400 },
      );
    const sameSlug = await getSupportPackBySlug(parsed.data.slug);
    if (sameSlug && sameSlug.id !== id)
      return NextResponse.json(
        { success: false, message: "Ce slug existe déjà." },
        { status: 400 },
      );
    const pack = await updateSupportPack(id, parsed.data);
    return pack
      ? NextResponse.json({ success: true, data: pack })
      : NextResponse.json(
          { success: false, message: "Pack introuvable." },
          { status: 404 },
        );
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de modifier le pack." },
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
    return (await deleteSupportPack((await params).id))
      ? NextResponse.json({ success: true })
      : NextResponse.json(
          { success: false, message: "Pack introuvable." },
          { status: 404 },
        );
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de supprimer le pack." },
      { status: 500 },
    );
  }
}
