import Link from "next/link";
import RequestCard from "@/components/blood-requests/requestCard";
import RequestStatusActions from "@/components/blood-requests/requestStatusActions";
import { buttonVariants } from "@/components/ui/button";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import Pagination from "@/components/ui/shared/pagination";
import { PAGE_SIZE } from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { paginate, toPage, type SearchParams } from "@/lib/search-params";
import { authFetch } from "@/lib/server-api";
import { cn } from "@/lib/utils";
import type { BloodRequest } from "@/lib/types";

export default async function MyRequestsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const res = await authFetch<BloodRequest[]>(`${ENDPOINTS.bloodRequests}/my-requests`);
  const { rows, current, totalPages } = paginate(res.data ?? [], toPage(sp.page), PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">My Blood Requests</h1>
        <Link
          href="/user/requests/new"
          className={cn(buttonVariants(), "bg-emerald-600 text-white hover:bg-emerald-700")}
        >
          New request
        </Link>
      </div>

      {!res.success ? (
        <InlineError message={res.message} />
      ) : rows.length === 0 ? (
        <EmptyState title="No requests yet" description="Create a request when you need blood." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rows.map((r) => (
              <RequestCard key={r.id} request={r} showContact showDonor>
                <RequestStatusActions id={r.id} status={r.status} />
              </RequestCard>
            ))}
          </div>
          <Pagination page={current} totalPages={totalPages} basePath="/user/requests" params={{}} />
        </>
      )}
    </div>
  );
}