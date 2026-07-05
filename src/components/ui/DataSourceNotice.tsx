export function DataSourceNotice({
  source,
  successLabel,
}: {
  source: "wordpress" | "woocommerce" | "mock";
  successLabel?: string;
}) {
  if (source === "mock" && process.env.NODE_ENV !== "development") return null;
  if (source !== "mock" && !successLabel) return null;

  return (
    <p
      className={`mt-8 rounded-2xl border px-4 py-3 text-sm font-bold ${
        source === "mock"
          ? "border-ru-yellow bg-ru-yellow/15 text-ru-ink"
          : "border-ru-primary/40 bg-ru-primary/10 text-ru-primary-dark"
      }`}
    >
      {source === "mock"
        ? "Mode développement : API locale indisponible, données de démonstration affichées."
        : successLabel}
    </p>
  );
}
