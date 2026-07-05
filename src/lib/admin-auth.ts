import "server-only";
import { cookies } from "next/headers";
import { adminConfig } from "./admin-config";

export function validateAdminLogin(email: string, password: string) {
  return email === adminConfig.email && password === adminConfig.password;
}

export async function createAdminSessionCookie() {
  const store = await cookies();
  store.set(adminConfig.cookieName, adminConfig.cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: adminConfig.maxAge,
    secure: false,
  });
}

export async function clearAdminSessionCookie() {
  const store = await cookies();
  store.set(adminConfig.cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: false,
  });
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return store.get(adminConfig.cookieName)?.value === adminConfig.cookieValue;
}
