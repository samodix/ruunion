"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [notice, setNotice] = useState("");
  return (
    <form
      className="flex max-w-xl flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        setNotice("Inscription bientôt disponible.");
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Votre adresse e-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Votre adresse e-mail"
        className="border-ru-border min-h-12 flex-1 rounded-full border bg-white px-5"
      />
      <button className="bg-ru-yellow text-ru-ink rounded-full px-6 py-3 font-extrabold">
        Être informé
      </button>
      {notice && (
        <span className="text-ru-muted self-center text-sm" role="status">
          {notice}
        </span>
      )}
    </form>
  );
}
