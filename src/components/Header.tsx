import { useState, useRef, useEffect } from "react";
import { Bell } from "../icons";
import type { Page } from "../types";
import { SearchBar } from "./SearchBar";

export function Header({ activePage }: { activePage: Page }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[rgba(15,23,42,0.07)] bg-surface-page/90 px-10 backdrop-blur">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-text-primary">Teqid</span>
        <span className="text-text-muted">&gt;</span>
        <span className="text-text-secondary">{activePage}</span>
      </div>

      <div className="flex items-center gap-3">
        <SearchBar />

        <button
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card text-text-secondary shadow-soft transition hover:text-text-primary hover:shadow-soft-hover"
          type="button"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-11 items-center gap-3 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-surface-card px-3 pr-4 shadow-soft transition hover:shadow-soft-hover"
            type="button"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #0EA5E9, #0369A1)",
              }}
            >
              A
            </span>

            <span className="text-sm font-semibold text-text-primary">
              Admin
            </span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.07)] bg-white shadow-xl">
              <div className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #0EA5E9, #0369A1)",
                    }}
                  >
                    A
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Admin
                    </p>
                    <p className="text-xs text-slate-500">
                      admin@teqid.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  onClick={() => {
                    console.log("Logout");
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}