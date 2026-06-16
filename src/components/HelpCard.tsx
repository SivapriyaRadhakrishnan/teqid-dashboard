import { CircleHelp } from "../icons";

export function HelpCard() {
  return (
    <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,#21406A_0%,#1B3558_100%)] p-5 shadow-soft">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(56,189,248,0.12)] text-brand-hover">
        <CircleHelp className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-white">Need help?</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">Check the docs for managing clients and services.</p>
    </div>
  );
}
