import { NavLink } from "react-router-dom";
import { HelpCard } from "./HelpCard";
import type { NavItem } from "../types";

type SidebarProps = {
  navItems: NavItem[];
};

export function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-[280px] flex-col bg-gradient-to-b from-sidebar-from to-sidebar-to px-5 py-6 text-white">
      <div className="flex items-center gap-4 rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-white/[0.04] p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(14,165,233,0.12)] text-lg font-bold text-brand-hover">
          A
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Admin Dashboard</p>
          <p className="truncate text-xs text-white/45">admin@teqid.com</p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-state-success ring-4 ring-[rgba(16,185,129,0.15)]" />
      </div>

      <nav className="mt-10">
        <p className="px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Navigation</p>
        <div className="mt-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  `group relative flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-sm font-medium transition ${
                    isActive ? "bg-[rgba(14,165,233,0.12)] text-brand-hover" : "text-white/45 hover:bg-white/[0.06] hover:text-white/70"
                  }`
                }
                key={item.label}
                to={item.path}
              >
                {({ isActive }) => (
                  <>
                    {isActive ? <span className="absolute left-0 h-6 w-1 rounded-r-full bg-brand-primary" /> : null}
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto">
        <HelpCard />
      </div>
    </aside>
  );
}
