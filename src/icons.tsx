import type { ReactElement, SVGProps } from "react";

export type Icon = (props: SVGProps<SVGSVGElement>) => ReactElement;

function makeIcon(paths: ReactElement[]): Icon {
  return function SvgIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        {paths}
      </svg>
    );
  };
}

export const Activity = makeIcon([<path key="1" d="M22 12h-4l-3 8L9 4l-3 8H2" />]);
export const Bell = makeIcon([<path key="1" d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />, <path key="2" d="M13.7 21a2 2 0 0 1-3.4 0" />]);
export const CalendarClock = makeIcon([<path key="1" d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6" />, <path key="2" d="M16 2v4" />, <path key="3" d="M8 2v4" />, <path key="4" d="M3 10h18" />, <circle key="5" cx="17" cy="17" r="4" />, <path key="6" d="M17 15.5V17l1 1" />]);
export const CircleHelp = makeIcon([<circle key="1" cx="12" cy="12" r="10" />, <path key="2" d="M9.1 9a3 3 0 1 1 5.4 2c-.9.8-1.5 1.2-1.5 2.5" />, <path key="3" d="M12 17h.01" />]);
export const Eye = makeIcon([<path key="1" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />, <circle key="2" cx="12" cy="12" r="3" />]);
export const EyeOff = makeIcon([<path key="1" d="m2 2 20 20" />, <path key="2" d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />, <path key="3" d="M8.5 4.7A10.7 10.7 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-3.2 4.5" />, <path key="4" d="M15.5 19.3A10.7 10.7 0 0 1 12 20C5.5 20 2 12 2 12a18 18 0 0 1 4.1-5.2" />]);
export const LayoutDashboard = makeIcon([<rect key="1" x="3" y="3" width="7" height="9" rx="2" />, <rect key="2" x="14" y="3" width="7" height="5" rx="2" />, <rect key="3" x="14" y="12" width="7" height="9" rx="2" />, <rect key="4" x="3" y="16" width="7" height="5" rx="2" />]);
export const ListFilter = makeIcon([<path key="1" d="M3 6h18" />, <path key="2" d="M7 12h10" />, <path key="3" d="M10 18h4" />]);
export const Lock = makeIcon([<rect key="1" x="4" y="11" width="16" height="10" rx="2" />, <path key="2" d="M8 11V7a4 4 0 0 1 8 0v4" />]);
export const Mail = makeIcon([<rect key="1" x="3" y="5" width="18" height="14" rx="2" />, <path key="2" d="m3 7 9 6 9-6" />]);
export const PlusCircle = makeIcon([<circle key="1" cx="12" cy="12" r="10" />, <path key="2" d="M12 8v8" />, <path key="3" d="M8 12h8" />]);
export const Search = makeIcon([<circle key="1" cx="11" cy="11" r="8" />, <path key="2" d="m21 21-4.3-4.3" />]);
export const Server = makeIcon([<rect key="1" x="3" y="4" width="18" height="8" rx="2" />, <rect key="2" x="3" y="12" width="18" height="8" rx="2" />, <path key="3" d="M7 8h.01" />, <path key="4" d="M7 16h.01" />]);
export const ShieldCheck = makeIcon([<path key="1" d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z" />, <path key="2" d="m9 12 2 2 4-5" />]);
export const Users = makeIcon([<path key="1" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />, <circle key="2" cx="9" cy="7" r="4" />, <path key="3" d="M22 21v-2a4 4 0 0 0-3-3.9" />, <path key="4" d="M16 3.1a4 4 0 0 1 0 7.8" />]);
