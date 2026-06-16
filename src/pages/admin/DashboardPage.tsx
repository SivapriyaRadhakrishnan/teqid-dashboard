import { useNavigate } from "react-router-dom";
import { metrics, services } from "../../data";
import { DataTable } from "../../components/DataTable";
import { StatCard } from "../../components/StatCard";
import { PageTitle } from "./PageTitle";
import { useEffect } from "react";
import { testConnection } from "../../services/test";

export function DashboardPage() {
  const navigate = useNavigate();
  const upcoming = services.slice(0, 4);
// testConnection
    useEffect(() => {
    testConnection();
  }, []);

  return (
    <>
      <PageTitle page="Dashboard" />

      <section className="grid grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <StatCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Upcoming Expirations
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Services that need renewal attention soon.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/expiry-list")}
            className="h-11 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-4 text-sm font-semibold text-text-secondary shadow-soft transition hover:text-text-primary hover:shadow-soft-hover"
          >
            View all
          </button>
        </div>

        <DataTable services={upcoming} compact />
      </section>
    </>
  );
}
