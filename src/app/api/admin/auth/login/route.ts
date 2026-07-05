import { NextResponse } from "next/server";
import { createAdminSessionCookie, validateAdminLogin } from "@/lib/admin-auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());
  if (
    !parsed.success ||
    !validateAdminLogin(parsed.data.email, parsed.data.password)
  ) {
    return NextResponse.json(
      { success: false, message: "Identifiants invalides" },
      { status: 401 },
    );
  }
  await createAdminSessionCookie();
  return NextResponse.json({ success: true });
}
