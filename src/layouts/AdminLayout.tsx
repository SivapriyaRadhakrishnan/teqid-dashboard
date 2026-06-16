import { Outlet, useLocation } from "react-router-dom";
import { navItems } from "../data";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { Page } from "../types";

const pageByPath: Record<string, Page> = {
  "/admin/dashboard": "Dashboard",
  "/admin/add-client": "Add Client",
  "/admin/add-service": "Add Service",
  "/admin/expiry-list": "Expiry List",
};

export function AdminLayout() {
  const { pathname } = useLocation();
  const activePage = pageByPath[pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-surface-page">
      <Sidebar navItems={navItems} />
      <div className="ml-[280px] min-h-screen">
        <Header activePage={activePage} />
        <main className="px-10 py-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
