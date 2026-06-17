import { useEffect, useMemo, useState } from "react";
import { ListFilter } from "../../icons";
import { categoryOptions, statusOptions } from "../../data";
import { DataTable } from "../../components/DataTable";
import { FilterChip } from "../../components/Filters";
import { SearchBar } from "../../components/SearchBar";
import { PageTitle } from "./PageTitle";
import { supabase } from "../../lib/supabase";
import type { Status } from "../../types";

export function ExpiryListPage() {
  const [services, setServices] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("All Services");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const { data, error } = await supabase
      .from("services")
      .select(`
        *,
        clients (
          client_name,
          company_name,
          email
        )
      `)
      .order("expiry_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    const mapped =
      data?.map((service: any) => {
        const expiryDate = new Date(service.expiry_date);
        const today = new Date();

        const daysLeft = Math.ceil(
          (expiryDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        let status = "Active";

        if (daysLeft < 0) {
          status = "Expired";
        } else if (daysLeft <= 14) {
          status = "Expiring Soon";
        }

        const initials =
          service.clients?.company_name
            ?.split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase() || "NA";

        return {
          id: service.id,
          name: service.service_name,
          type: service.service_type,
          expires: expiryDate.toLocaleDateString(),
          daysLeft,
          status,
          cost: `$${service.renewal_cost}`,
          client: {
            name: service.clients?.client_name || "",
            company: service.clients?.company_name || "",
            email: service.clients?.email || "",
            initials,
          },
        };
      }) || [];

    setServices(mapped);
  }

  const counts = useMemo(() => {
    const byStatus = services.reduce<Record<Status, number>>(
      (acc, service) => {
        acc[service.status as Status] += 1;
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
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const statusMatch =
        statusFilter === "All Services"
          ? true
          : service.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All"
          ? true
          : service.type === categoryFilter;

      const query = searchQuery.toLowerCase();

      const searchMatch =
        service.name.toLowerCase().includes(query) ||
        service.client.name.toLowerCase().includes(query) ||
        service.client.company.toLowerCase().includes(query) ||
        service.client.email.toLowerCase().includes(query);

      return statusMatch && categoryMatch && searchMatch;
    });
  }, [services, statusFilter, categoryFilter, searchQuery]);

  return (
    <>
      <PageTitle page="Expiry List" />

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

      <section className="mt-6">
        <DataTable services={filteredServices} />
      </section>
    </>
  );
}