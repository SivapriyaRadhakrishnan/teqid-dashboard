import type { ReactNode } from "react";

export function FormCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-[28px] border border-[rgba(15,23,42,0.07)] bg-surface-card p-8 shadow-soft transition hover:shadow-soft-hover">
      <div className="border-b border-[rgba(15,23,42,0.07)] pb-6">
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
      </div>
      <div className="pt-7">{children}</div>
    </section>
  );
}

export function FormInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-text-primary">
        {label}
      </span>

      <input
        className="mt-2 h-12 w-full rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-4 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary focus:ring-4 focus:ring-[rgba(14,165,233,0.12)]"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export function FormSelect({
  label,
  children,
  value,
  onChange,
}: {
  label: string;
  children: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-text-primary">
        {label}
      </span>

      <select
        value={value}
        onChange={onChange}
        className="mt-2 h-12 w-full rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-4 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-[rgba(14,165,233,0.12)]"
      >
        {children}
      </select>
    </label>
  );
}
export function FormActions({
  primary,
  onPrimaryClick,
}: {
  primary: string;
  onPrimaryClick?: () => void;
}) {
  return (
    <div className="mt-8 flex justify-end gap-3 border-t border-[rgba(15,23,42,0.07)] pt-6">
      <button
        className="h-11 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-5 text-sm font-semibold text-text-secondary transition hover:text-text-primary hover:shadow-soft"
        type="button"
      >
        Cancel
      </button>

      <button
        className="h-11 rounded-2xl bg-brand-primary px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(14,165,233,0.22)] transition hover:bg-brand-hover"
        type="button"
        onClick={onPrimaryClick}
      >
        {primary}
      </button>
    </div>
  );
}
