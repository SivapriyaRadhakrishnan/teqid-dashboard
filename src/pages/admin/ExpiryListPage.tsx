import { useMemo, useState } from "react";
import { ListFilter } from "../../icons";
import { categoryOptions, services, statusOptions } from "../../data";
import { DataTable } from "../../components/DataTable";
import { FilterChip } from "../../components/Filters";
import { SearchBar } from "../../components/SearchBar";
import type { Status } from "../../types";
import { PageTitle } from "./PageTitle";

export function ExpiryListPage() {
  const [statusFilter, setStatusFilter] = useState("All Services");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  const counts = useMemo(() => {
    const byStatus = services.reduce<Record<Status, number>>(
      (acc, service) => {
        acc[service.status] += 1;
        return acc;
      },
      {
        Active: 0,
        "Expiring Soon": 0,
        Expired: 0,
      }
    );

    return {
      "All Services": services.length,
      ...byStatus,
    };
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Status Filter
      const statusMatch =
        statusFilter === "All Services"
          ? true
          : service.status === statusFilter;

      // Category Filter
      const categoryMatch =
        categoryFilter === "All"
          ? true
          : service.type === categoryFilter;

      // Search Filter
      const query = searchQuery.toLowerCase();
      const searchMatch =
        service.name.toLowerCase().includes(query) ||
        service.client.name.toLowerCase().includes(query) ||
        service.client.company.toLowerCase().includes(query) ||
        service.client.email.toLowerCase().includes(query);

      return statusMatch && categoryMatch && searchMatch;
    });
  }, [statusFilter, categoryFilter, searchQuery]);

  return (
    <>
      <PageTitle page="Expiry List" />

      {/* Status Filters */}
      <section className="flex flex-wrap gap-3">
        {statusOptions.map((status) => (
          <div
            key={status}
            onClick={() => setStatusFilter(status)}
            className="cursor-pointer"
          >
            <FilterChip
              label={status}
              count={counts[status]}
              active={statusFilter === status}
            />
          </div>
        ))}
      </section>

      {/* Search + Type Filters */}
      <section className="mt-6 flex items-center justify-between gap-5">
        <SearchBar
          placeholder="Search renewal services..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <div className="flex items-center gap-3">
          {categoryOptions.map((category) => (
            <div
              key={category}
              onClick={() => setCategoryFilter(category)}
              className="cursor-pointer"
            >
              <FilterChip
                label={category}
                active={categoryFilter === category}
              />
            </div>
          ))}

          <button
            className="flex h-11 items-center gap-2 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-4 text-sm font-semibold text-text-secondary shadow-soft transition hover:text-text-primary hover:shadow-soft-hover"
            type="button"
          >
            <ListFilter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="mt-6">
        <DataTable services={filteredServices} />
      </section>
    </>
  );
}
