import type { Service } from "../types";
import { ServiceBadge, StatusBadge } from "./Badges";

export function ClientAvatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(14,165,233,0.12)] text-xs font-bold text-brand-primary ring-1 ring-[rgba(14,165,233,0.18)]">
      {initials}
    </span>
  );
}

export function DataTable({ services, compact = false }: { services: Service[]; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[rgba(15,23,42,0.07)] bg-surface-card shadow-soft transition hover:shadow-soft-hover">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[rgba(15,23,42,0.07)] bg-surface-page text-xs uppercase tracking-[0.12em] text-text-muted">
            <th className="px-6 py-4 font-bold">Service</th>
            <th className="px-6 py-4 font-bold">Client</th>
            <th className="px-6 py-4 font-bold">Type</th>
            {!compact ? <th className="px-6 py-4 font-bold">Expires</th> : null}
            <th className="px-6 py-4 font-bold">Days Left</th>
            <th className="px-6 py-4 font-bold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(15,23,42,0.07)]">
          {services.map((service) => (
            <tr className="transition hover:bg-surface-page" key={service.id}>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <ClientAvatar initials={service.client.initials} />
                  <div>
                    <p className="font-semibold text-text-primary">{service.name}</p>
                    <p className="mt-1 text-sm text-text-secondary">{service.cost} renewal</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <p className="font-medium text-text-primary">{service.client.company}</p>
                <p className="mt-1 text-sm text-text-secondary">{service.client.email}</p>
              </td>
              <td className="px-6 py-5">
                <ServiceBadge type={service.type} />
              </td>
              {!compact ? <td className="px-6 py-5 text-sm font-medium text-text-secondary">{service.expires}</td> : null}
              <td className="px-6 py-5">
                <span className={`text-sm font-bold ${service.daysLeft < 0 ? "text-state-error" : service.daysLeft <= 14 ? "text-state-warning" : "text-text-primary"}`}>
                  {service.daysLeft < 0 ? `${Math.abs(service.daysLeft)} days overdue` : `${service.daysLeft} days`}
                </span>
              </td>
              <td className="px-6 py-5">
                <StatusBadge status={service.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
