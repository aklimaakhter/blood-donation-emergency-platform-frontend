import Link from "next/link";
import RequestCard from "@/components/blood-requests/requestCard";
import EmptyState from "@/components/ui/shared/emptyState";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import type { BloodRequest } from "@/lib/types";

export default async function LatestRequests() {
  const res = await authFetch<BloodRequest[]>(`${ENDPOINTS.bloodRequests}?status=PENDING`);

  if (!res.success) {
    return <p className="text-center text-sm text-gray-500">Latest requests are temporarily unavailable.</p>;
  }

  const latest = (res.data ?? []).slice(0, 3);

  if (latest.length === 0) {
    return (
      <EmptyState
        title="No open requests right now"
        description="Great news: every request has been taken care of."
      />
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((r) => (
          <RequestCard key={r.id} request={r} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/requests" className="text-sm font-semibold text-emerald-600 hover:underline">
          View all requests
        </Link>
      </div>
    </>
  );
}