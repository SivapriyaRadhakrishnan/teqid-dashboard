import {
  Activity,
  CalendarClock,
  LayoutDashboard,
  PlusCircle,
  Server,
  ShieldCheck,
  Users,
} from "./icons";
import type { NavItem } from "./types";



export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Add Client", path: "/admin/add-client", icon: Users },
  { label: "Add Service", path: "/admin/add-service", icon: PlusCircle },
  { label: "Expiry List", path: "/admin/expiry-list", icon: CalendarClock },
];

export const metrics = [
  {
    title: "Total Clients",
    value: "128",
    subtitle: "12 new clients added this quarter",
    badge: "+18.4%",
    icon: Users,
    color: "text-brand-primary",
    bg: "bg-[rgba(14,165,233,0.12)]",
    chart:
      "M0,44 C20,36 22,20 42,25 C58,29 64,8 82,14 C98,19 104,35 124,23",
  },
  {
    title: "Domains Expiring This Month",
    value: "24",
    subtitle: "Renewal workload trending upward",
    badge: "+7.2%",
    icon: Activity,
    color: "text-brand-primary",
    bg: "bg-[rgba(14,165,233,0.12)]",
    chart:
      "M0,36 C18,22 28,31 44,18 C62,4 72,15 88,12 C105,10 112,31 124,18",
  },
  {
    title: "Servers Expiring This Month",
    value: "9",
    subtitle: "Includes hosting and VPS services",
    badge: "-3.1%",
    icon: Server,
    color: "text-[#8B5CF6]",
    bg: "bg-[rgba(139,92,246,0.12)]",
    chart:
      "M0,20 C18,26 27,43 45,34 C62,26 68,16 84,27 C101,38 111,19 124,28",
  },
];

export const serviceTypeOptions = ["Domain", "Hosting", "VPS", "SSL"] as const;
export const statusOptions = [
  "All Services",
  "Active",
  "Expiring Soon",
  "Expired",
] as const;
export const categoryOptions = [
  "All",
  "Domain",
  "Hosting",
  "VPS",
  "SSL",
] as const;

export const secureIcon = ShieldCheck;
