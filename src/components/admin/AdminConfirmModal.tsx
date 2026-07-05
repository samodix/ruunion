"use client";

export function AdminConfirmModal({
  open,
  title,
  description,
  loading,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="bg-ru-ink/55 fixed inset-0 z-[100] grid place-items-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        <h2 id="confirm-title" className="text-xl font-black">
          {title}
        </h2>
        <p className="text-ru-muted mt-3 leading-7">{description}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button
            className="border-ru-border rounded-full border px-5 py-2.5 font-bold"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            disabled={loading}
            className="rounded-full bg-red-600 px-5 py-2.5 font-bold text-white disabled:opacity-60"
            onClick={onConfirm}
          >
            {loading ? "Suppression…" : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}
