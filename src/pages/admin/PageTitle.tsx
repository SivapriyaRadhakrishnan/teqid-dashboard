import type { Page } from "../../types";

const pageSubtitles: Partial<Record<Page, string>> = {
  "Add Client": "Register a new client into the system.",
  "Add Service": "Register a new service for a client.",
  "Expiry List": "Track all services and their renewal deadlines.",
};

export function PageTitle({ page }: { page: Page }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold tracking-normal text-text-primary">{page}</h1>
      {pageSubtitles[page] ? <p className="mt-2 text-base text-text-secondary">{pageSubtitles[page]}</p> : null}
    </div>
  );
}
