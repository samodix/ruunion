import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createSupportPack,
  getSupportPackBySlug,
  getSupportPacks,
} from "@/lib/admin-storage";
import { supportPackSchema } from "@/lib/validators";

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  try {
    return NextResponse.json({ success: true, data: await getSupportPacks() });
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de lire les packs." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  try {
    const parsed = supportPackSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Données invalides",
        },
        { status: 400 },
      );
    if (await getSupportPackBySlug(parsed.data.slug))
      return NextResponse.json(
        { success: false, message: "Ce slug existe déjà." },
        { status: 400 },
      );
    return NextResponse.json(
      { success: true, data: await createSupportPack(parsed.data) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible de créer le pack." },
      { status: 500 },
    );
  }
}
