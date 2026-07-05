"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
});

export function ContactForm() {
  const [notice, setNotice] = useState("");
  return (
    <form
      className="border-ru-border space-y-5 rounded-[2rem] border bg-white p-7 shadow-xl"
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        setNotice(
          schema.safeParse(data).success
            ? "Merci. L’envoi sera activé lors du lot Formulaires & emails."
            : "Merci de compléter correctement les trois champs.",
        );
      }}
    >
      <label className="block text-sm font-bold">
        Nom
        <input
          name="name"
          required
          className="border-ru-border bg-ru-soft mt-2 w-full rounded-2xl border px-4 py-3 font-normal"
        />
      </label>
      <label className="block text-sm font-bold">
        E-mail
        <input
          name="email"
          type="email"
          required
          className="border-ru-border bg-ru-soft mt-2 w-full rounded-2xl border px-4 py-3 font-normal"
        />
      </label>
      <label className="block text-sm font-bold">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="border-ru-border bg-ru-soft mt-2 w-full resize-y rounded-2xl border px-4 py-3 font-normal"
        />
      </label>
      <Button type="submit">Préparer le message</Button>
      {notice && (
        <p role="status" className="text-ru-primary-dark text-sm">
          {notice}
        </p>
      )}
    </form>
  );
}
