export function AdminTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-ru-border overflow-x-auto rounded-3xl border bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  );
}
