import type { Icon } from "../icons";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  badge: string;
  icon: Icon;
  color: string;
  bg: string;
  chart: string;
};

export function StatCard({ title, value, subtitle, badge, icon: Icon, color, bg, chart }: StatCardProps) {
  return (
    <article className="rounded-[28px] border border-[rgba(15,23,42,0.07)] bg-surface-card p-6 shadow-soft transition hover:shadow-soft-hover">
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-state-successBg px-3 py-1 text-xs font-semibold text-state-success ring-1 ring-[rgba(16,185,129,0.18)]">{badge}</span>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <p className="mt-2 text-4xl font-semibold tracking-normal text-text-primary">{value}</p>
      </div>
      <div className="mt-5 h-16">
        <svg className="h-full w-full" viewBox="0 0 124 52" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d={chart} stroke="currentColor" className={color} strokeWidth="3" strokeLinecap="round" />
          <path d={`${chart} L124 52 L0 52 Z`} className={color} fill="currentColor" opacity="0.08" />
        </svg>
      </div>
      <p className="mt-4 text-sm text-text-secondary">{subtitle}</p>
    </article>
  );
}
