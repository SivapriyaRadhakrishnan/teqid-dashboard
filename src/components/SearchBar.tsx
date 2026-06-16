import { Search } from "../icons";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function SearchBar({
  placeholder = "Search services, clients...",
  value = "",
  onChange,
}: SearchBarProps) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-80 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card pl-11 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary focus:ring-4 focus:ring-[rgba(14,165,233,0.12)]"
      />
    </label>
  );
}
