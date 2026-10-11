import type { Metadata } from "next";
import { Suspense } from "react";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import Pagination from "@/components/ui/shared/pagination";
import { PAGE_SIZE } from "@/lib/constants";
import { authFetch } from "@/lib/server-api";
import type { Donor } from "@/lib/types";
import DonorFilters from "@/components/donor/donorFilters";
import DonorCard from "@/components/donor/donorCard";

export const metadata: Metadata = {
  title: "Find Blood Donors | BloodConnect",
  description: "Search approved blood donors by blood group, district and area.",
  openGraph: {
    title: "Find Blood Donors | BloodConnect",
    description: "Search approved blood donors near you in an emergency.",
    type: "website",
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function DonorsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const searchTerm = first(sp.searchTerm);
  const bloodGroup = first(sp.bloodGroup);
  const available = first(sp.available);
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const qs = new URLSearchParams();
  if (searchTerm) qs.set("searchTerm", searchTerm);
  if (bloodGroup) qs.set("bloodGroup", bloodGroup);

  const res = await authFetch<Donor[]>(`/donors${qs.toString() ? `?${qs}` : ""}`);

  let donors = res.data ?? [];
  if (available === "true") donors = donors.filter((d) => d.isAvailable);
  if (available === "false") donors = donors.filter((d) => !d.isAvailable);

  const totalPages = Math.max(1, Math.ceil(donors.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = donors.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold">Find Blood Donors</h1>
        <p className="mt-1 text-gray-500">Approved donors who can help in an emergency.</p>
      </div>

      <Suspense fallback={<div className="h-9 animate-pulse rounded bg-gray-100" />}>
        <DonorFilters />
      </Suspense>

      {!res.success ? (
        <InlineError message={res.message} />
      ) : visible.length === 0 ? (
        <EmptyState title="No donors found" description="Try changing or clearing the filters." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((d) => (
              <DonorCard key={d.id} donor={d} />
            ))}
          </div>
          <Pagination
            page={current}
            totalPages={totalPages}
            basePath="/donors"
            params={{ searchTerm, bloodGroup, available }}
          />
        </>
      )}
    </section>
  );
}