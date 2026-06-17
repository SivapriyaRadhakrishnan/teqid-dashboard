import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Activity, Server } from "../../icons";
import { DataTable } from "../../components/DataTable";
import { StatCard } from "../../components/StatCard";
import { PageTitle } from "./PageTitle";
import { supabase } from "../../lib/supabase";

export function DashboardPage() {
  const navigate = useNavigate();

  const [clientCount, setClientCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      // Total Clients
      const { count: clients } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });

      // Domains
      const { count: domains } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true })
        .eq("service_type", "Domain");

      // Hosting + VPS
      const { count: servers } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true })
        .in("service_type", ["Hosting", "VPS"]);

      setClientCount(clients || 0);
      setDomainCount(domains || 0);
      setServerCount(servers || 0);

      // Upcoming expirations
      const { data: services } = await supabase
        .from("services")
        .select(`
          *,
          clients (
            company_name,
            email
          )
        `)
        .order("expiry_date", { ascending: true })
        .limit(4);

      const mapped =
        services?.map((service: any) => {
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

          const initials = service.clients?.company_name
            ?.split(" ")
            .map((word: string) => word[0])
            .join("")
            .toUpperCase();

          return {
            id: service.id,
            name: service.service_name,
            type: service.service_type,
            expires: new Date(service.expiry_date).toLocaleDateString(),
            daysLeft,
            status,
            cost: `$${service.renewal_cost}`,
            client: {
              company: service.clients?.company_name || "",
              email: service.clients?.email || "",
              initials: initials || "NA",
            },
          };
        }) || [];

      const upcomingOnly = mapped
        .filter(
          (service) =>
            service.daysLeft >= 0 &&
            service.daysLeft <= 30
        )
        .slice(0, 4);

      setUpcoming(upcomingOnly);
    } catch (error) {
      console.error(error);
    }
  }

  const metrics = [
    {
      title: "Total Clients",
      value: clientCount.toString(),
      subtitle: "Registered clients",
      badge: "Live",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      chart: "M0,44 C20,36 22,20 42,25 C58,29 64,8 82,14 C98,19 104,35 124,23",
    },
    {
      title: "Domains",
      value: domainCount.toString(),
      subtitle: "Active domain services",
      badge: "Live",
      icon: Activity,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      chart: "M0,36 C18,22 28,31 44,18 C62,4 72,15 88,12 C105,10 112,31 124,18",
    },
    {
      title: "Servers",
      value: serverCount.toString(),
      subtitle: "Hosting and VPS services",
      badge: "Live",
      icon: Server,
      color: "text-violet-600",
      bg: "bg-violet-50",
      chart: "M0,20 C18,26 27,43 45,34 C62,26 68,16 84,27 C101,38 111,19 124,28",
    },
  ];

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