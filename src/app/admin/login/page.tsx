"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartHandshake, LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const result = (await response.json()) as {
      success: boolean;
      message?: string;
    };
    setLoading(false);
    if (!result.success)
      return setError(result.message ?? "Identifiants invalides");
    router.push("/admin");
    router.refresh();
  }
  return (
    <div className="ru-grid-pattern bg-ru-soft grid min-h-screen place-items-center p-5">
      <div className="border-ru-border w-full max-w-md rounded-[2rem] border bg-white p-7 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="bg-ru-primary-dark grid size-12 place-items-center rounded-2xl text-white">
            <HeartHandshake />
          </span>
          <div>
            <p className="text-xl font-black">RU Union</p>
            <p className="text-ru-muted text-xs font-bold">
              Administration locale
            </p>
          </div>
        </div>
        <LockKeyhole className="text-ru-primary-dark mt-9" />
        <h1 className="mt-3 text-3xl font-black">Connexion back-office</h1>
        <p className="text-ru-muted mt-2 text-sm leading-6">
          Accès local de test — à remplacer avant production.
        </p>
        <form className="mt-8 space-y-5" onSubmit={submit}>
          <label className="block text-sm font-bold">
            Email
            <input
              required
              name="email"
              type="email"
              defaultValue="admin@ruunion.com"
              autoComplete="username"
              className="border-ru-border bg-ru-soft mt-2 w-full rounded-2xl border px-4 py-3 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Mot de passe
            <input
              required
              name="password"
              type="password"
              autoComplete="current-password"
              className="border-ru-border bg-ru-soft mt-2 w-full rounded-2xl border px-4 py-3 font-normal"
            />
          </label>
          {error && (
            <p
              role="alert"
              className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
            >
              {error}
            </p>
          )}
          <button
            disabled={loading}
            className="bg-ru-primary-dark w-full rounded-full px-5 py-3 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
