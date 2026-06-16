export function FilterChip({ label, count, active = false }: { label: string; count?: number; active?: boolean }) {
  return (
    <button
      className={`inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition ${
        active
          ? "border-brand-primary bg-brand-primary text-white"
          : "border-[rgba(15,23,42,0.07)] bg-surface-card text-text-secondary hover:text-text-primary hover:shadow-soft"
      }`}
      type="button"
    >
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/15 text-white" : "bg-surface-page text-text-secondary"}`}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

export function SegmentedSelector<T extends string>({
  options,
  active,
  onChange,
}: {
  options: readonly T[];
  active: T;
  onChange?: (value: T) => void;
}) {
  return (
    <div className="grid grid-cols-4 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-page p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange?.(option)}
          className={`h-11 rounded-xl text-sm font-semibold transition ${
            active === option
              ? "bg-surface-card text-text-primary shadow-soft ring-1 ring-[rgba(15,23,42,0.07)]"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
