export function SectionTitle({
  eyebrow,
  title,
  description,
  as = "h1",
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  theme?: "light" | "dark";
}) {
  const Title = as;
  return (
    <div className="max-w-2xl">
      <p
        className={`${theme === "dark" ? "text-ru-primary" : "text-ru-primary-dark"} text-sm font-black tracking-[0.18em] uppercase`}
      >
        {eyebrow}
      </p>
      <Title className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
        {title}
      </Title>
      {description && (
        <p
          className={`${theme === "dark" ? "text-white/65" : "text-ru-muted"} mt-5 text-lg leading-8`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
