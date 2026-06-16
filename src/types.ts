import type { Icon } from "./icons";

export type Page = "Dashboard" | "Add Client" | "Add Service" | "Expiry List";
export type ServiceType = "Domain" | "Hosting" | "VPS" | "SSL";
export type Status = "Active" | "Expiring Soon" | "Expired";

export type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  initials: string;
};

export type Service = {
  id: number;
  name: string;
  client: Client;
  type: ServiceType;
  expires: string;
  daysLeft: number;
  status: Status;
  cost: string;
};

export type NavItem = {
  label: Page;
  path: string;
  icon: Icon;
};
