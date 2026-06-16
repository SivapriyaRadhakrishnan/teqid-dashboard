import { Activity, CalendarClock, LayoutDashboard, PlusCircle, Server, ShieldCheck, Users } from "./icons";
import type { Client, NavItem, Service } from "./types";

export const clients: Client[] = [
  {
    id: 1,
    name: "Maya Srinivas",
    company: "Northstar Labs",
    email: "maya@northstar.io",
    phone: "+91 98765 44120",
    initials: "NL",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    company: "BluePeak Systems",
    email: "arjun@bluepeak.co",
    phone: "+91 99881 20447",
    initials: "BS",
  },
  {
    id: 3,
    name: "Leah Carter",
    company: "Atlas Retail",
    email: "leah@atlasretail.com",
    phone: "+1 415 220 8301",
    initials: "AR",
  },
  {
    id: 4,
    name: "Rahul Iyer",
    company: "Nimbus Works",
    email: "rahul@nimbus.dev",
    phone: "+91 90210 77331",
    initials: "NW",
  },
];

export const services: Service[] = [
  {
    id: 1,
    name: "northstar.io",
    client: clients[0],
    type: "Domain",
    expires: "Jun 28, 2026",
    daysLeft: 12,
    status: "Expiring Soon",
    cost: "$29.00",
  },
  {
    id: 2,
    name: "BluePeak Cloud VPS",
    client: clients[1],
    type: "VPS",
    expires: "Jul 18, 2026",
    daysLeft: 32,
    status: "Active",
    cost: "$149.00",
  },
  {
    id: 3,
    name: "atlasretail.com SSL",
    client: clients[2],
    type: "SSL",
    expires: "Jun 08, 2026",
    daysLeft: -8,
    status: "Expired",
    cost: "$89.00",
  },
  {
    id: 4,
    name: "Nimbus Managed Hosting",
    client: clients[3],
    type: "Hosting",
    expires: "Jun 24, 2026",
    daysLeft: 8,
    status: "Expiring Soon",
    cost: "$99.00",
  },
  {
    id: 5,
    name: "portal.bluepeak.co",
    client: clients[1],
    type: "Domain",
    expires: "Aug 11, 2026",
    daysLeft: 56,
    status: "Active",
    cost: "$35.00",
  },
];

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
    chart: "M0,44 C20,36 22,20 42,25 C58,29 64,8 82,14 C98,19 104,35 124,23",
  },
  {
    title: "Domains Expiring This Month",
    value: "24",
    subtitle: "Renewal workload trending upward",
    badge: "+7.2%",
    icon: Activity,
    color: "text-brand-primary",
    bg: "bg-[rgba(14,165,233,0.12)]",
    chart: "M0,36 C18,22 28,31 44,18 C62,4 72,15 88,12 C105,10 112,31 124,18",
  },
  {
    title: "Servers Expiring This Month",
    value: "9",
    subtitle: "Includes hosting and VPS services",
    badge: "-3.1%",
    icon: Server,
    color: "text-[#8B5CF6]",
    bg: "bg-[rgba(139,92,246,0.12)]",
    chart: "M0,20 C18,26 27,43 45,34 C62,26 68,16 84,27 C101,38 111,19 124,28",
  },
];

export const serviceTypeOptions = ["Domain", "Hosting", "VPS", "SSL"] as const;
export const statusOptions = ["All Services", "Active", "Expiring Soon", "Expired"] as const;
export const categoryOptions = ["All", "Domain", "Hosting", "VPS", "SSL"] as const;

export const secureIcon = ShieldCheck;
