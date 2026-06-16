import type { ServiceType, Status } from "../types";

const serviceStyles: Record<ServiceType, string> = {
  Domain: "bg-[rgba(14,165,233,0.12)] text-brand-primary ring-[rgba(14,165,233,0.18)]",
  Hosting: "bg-[rgba(16,185,129,0.12)] text-state-success ring-[rgba(16,185,129,0.18)]",
  VPS: "bg-[rgba(139,92,246,0.12)] text-[#8B5CF6] ring-[rgba(139,92,246,0.18)]",
  SSL: "bg-[rgba(245,158,11,0.12)] text-[#F59E0B] ring-[rgba(245,158,11,0.18)]",
};

const statusStyles: Record<Status, string> = {
  Active: "bg-state-successBg text-state-success ring-[rgba(16,185,129,0.18)]",
  "Expiring Soon": "bg-state-warningBg text-state-warning ring-[rgba(234,179,8,0.18)]",
  Expired: "bg-state-errorBg text-state-error ring-[rgba(239,68,68,0.18)]",
};

export function ServiceBadge({ type }: { type: ServiceType }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${serviceStyles[type]}`}>
      {type}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
