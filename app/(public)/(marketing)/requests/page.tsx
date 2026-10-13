import type { Metadata } from "next";
import { Suspense } from "react";
import RequestCard from "@/components/blood-requests/requestCard";
import RequestFilters from "@/components/blood-requests/requestFilters";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import Pagination from "@/components/ui/shared/pagination";
import { PAGE_SIZE, REQUEST_STATUS_VALUES } from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { first, paginate, toPage, type SearchParams } from "@/lib/search-params";
import { authFetch } from "@/lib/server-api";
import type { BloodRequest } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blood Requests | BloodConnect",
  description: "Browse urgent blood requests by blood group, area and status.",
  openGraph: {
    title: "Blood Requests | BloodConnect",
    description: "Urgent blood requests that need donors right now.",
    type: "website",
  },
};

export default async function RequestsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const searchTerm = first(sp.searchTerm);
  const bloodGroup = first(sp.bloodGroup);
  const status = first(sp.status);

  const qs = new URLSearchParams();
  if (searchTerm) qs.set("searchTerm", searchTerm);
  if (bloodGroup) qs.set("bloodGroup", bloodGroup);
  if (status) qs.set("status", status);

  const res = await authFetch<BloodRequest[]>(
    `${ENDPOINTS.bloodRequests}${qs.toString() ? `?${qs}` : ""}`,
  );
  const { rows, current, totalPages } = paginate(res.data ?? [], toPage(sp.page), PAGE_SIZE);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold">Blood Requests</h1>
        <p className="mt-1 text-gray-500">Patients who need blood in an emergency.</p>
      </div>

      <Suspense fallback={<div className="h-9 animate-pulse rounded bg-gray-100" />}>
        <RequestFilters statuses={REQUEST_STATUS_VALUES} />
      </Suspense>

      {!res.success ? (
        <InlineError message={res.message} />
      ) : rows.length === 0 ? (
        <EmptyState title="No requests found" description="Try changing or clearing the filters." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((r) => (
              <RequestCard key={r.id} request={r} />
            ))}
          </div>
          <Pagination
            page={current}
            totalPages={totalPages}
            basePath="/requests"
            params={{ searchTerm, bloodGroup, status }}
          />
        </>
      )}
    </section>
  );
}